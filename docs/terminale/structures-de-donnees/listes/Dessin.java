import java.io.IOException;
import java.io.OutputStream;
import java.io.UncheckedIOException;
import java.lang.management.ManagementFactory;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.Collections;
import java.util.IdentityHashMap;
import java.util.List;
import java.util.Set;

/**
 * Dessin de maillons et de listes chaînées avec Graphviz (commande dot).
 * L'image s'appelle toujours liste.png et se trouve à côté du fichier .java
 * qui appelle dessiner. Rien n'est dessiné hors du mode debug.
 */
class Dessin {

    /** Le nom de l'image créée. */
    private static final String FICHIER = "liste.png";

    /** Vrai si le programme tourne avec le débogueur (option -agentlib:jdwp). */
    private static final boolean DEBUG = ManagementFactory.getRuntimeMXBean()
            .getInputArguments().toString().contains("jdwp");

    /**
     * Dessine des maillons, ceux qui les suivent et des références nommées en rouge.
     * La signature est dégueulasse, mais c'est simple à utiliser pour les élèves, c'est le but.
     *
     * Chaque argument est soit un maillon à dessiner, soit un nom suivi du maillon
     * qu'il désigne :
     *   Dessin.dessiner(l)                                         une liste
     *   Dessin.dessiner(l1, l2)                                    deux listes côte à côte
     *   Dessin.dessiner(this, "lievre", lievre, "tortue", tortue)  avec deux références
     *
     * Ne fait rien hors du mode debug (« Run » au lieu de « Debug »).
     */
    static void dessiner(Object... args) {
        if (!DEBUG) {
            return;
        }
        // On sépare les maillons à dessiner des références nommées
        List<Maillon<?>> maillons = new ArrayList<>();
        List<String> noms = new ArrayList<>();
        List<Maillon<?>> cibles = new ArrayList<>();
        int i = 0;
        while (i < args.length) {
            if (args[i] instanceof Maillon<?> m) {
                maillons.add(m);
                i++;
            } else if (args[i] instanceof String nom) {
                if (i + 1 == args.length || !(args[i + 1] instanceof Maillon)) {
                    throw new IllegalArgumentException("Le nom \"" + nom + "\" doit être suivi d'un maillon");
                }
                noms.add(nom);
                cibles.add((Maillon<?>) args[i + 1]);
                i += 2;
            } else {
                throw new IllegalArgumentException("Argument n°" + (i + 1) + " : il faut un maillon ou un nom");
            }
        }

        // Ensemble de maillons comparés par référence (==), et non par equals
        Set<Maillon<?>> vus = Collections.newSetFromMap(new IdentityHashMap<>());
        StackTraceElement appelant = Dessin.appelant();
        StringBuilder dot = new StringBuilder("digraph {\n  rankdir=TB;\n  node [shape=circle];\n");
        // Le nom de la fonction appelante, en haut du dessin
        dot.append("  labelloc=t;\n  fontsize=20;\n  label=\"" + appelant.getMethodName() + "\";\n");
        for (Maillon<?> m : maillons) {
            Dessin.parcourir(m, vus, dot);
        }
        for (Maillon<?> cible : cibles) {
            Dessin.parcourir(cible, vus, dot);
        }
        for (int k = 0; k < noms.size(); k++) {
            dot.append(Dessin.reference(k, noms.get(k), cibles.get(k)));
        }
        dot.append("}\n");

        String fichier = Dessin.dossierAppelant(appelant).resolve(FICHIER).toString();
        try {
            Process p = new ProcessBuilder("dot", "-Tpng", "-o", fichier).start();
            try (OutputStream entree = p.getOutputStream()) {
                entree.write(dot.toString().getBytes(StandardCharsets.UTF_8));
            }
            if (p.waitFor() != 0) {
                throw new RuntimeException("dot a échoué :\n" + new String(p.getErrorStream().readAllBytes()));
            }
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Impossible de lancer Graphviz (dot)", e);
        }
    }

    /** Renvoie la fonction qui a appelé dessiner, dans la pile d'appels. */
    private static StackTraceElement appelant() {
        // Le premier élément de la pile qui n'est pas dans Dessin est l'appelant
        for (StackTraceElement e : Thread.currentThread().getStackTrace()) {
            if (!e.getClassName().equals(Dessin.class.getName())
                    && !e.getClassName().startsWith("java.")) {
                return e;
            }
        }
        throw new IllegalStateException("Fonction appelante introuvable");
    }

    /**
     * Renvoie le dossier du fichier .java de appelant, cherché à partir du dossier
     * de lancement (sans les dossiers cachés). À défaut, renvoie le dossier de lancement.
     */
    private static Path dossierAppelant(StackTraceElement appelant) {
        Path lancement = Path.of("").toAbsolutePath();
        String nomFichier = appelant.getFileName();
        // Remplacé par le dossier du fichier s'il est trouvé
        Path[] trouve = {lancement};
        try {
            Files.walkFileTree(lancement, new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult preVisitDirectory(Path dossier, BasicFileAttributes attrs) {
                    if (!dossier.equals(lancement) && dossier.getFileName().toString().startsWith(".")) {
                        return FileVisitResult.SKIP_SUBTREE;
                    }
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult visitFile(Path f, BasicFileAttributes attrs) {
                    if (f.getFileName().toString().equals(nomFichier)) {
                        trouve[0] = f.getParent();
                        return FileVisitResult.TERMINATE;
                    }
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult visitFileFailed(Path f, IOException e) {
                    return FileVisitResult.CONTINUE;
                }
            });
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
        return trouve[0];
    }

    /**
     * Ajoute à dot le maillon depart et ceux qui le suivent, en s'arrêtant
     * sur un maillon déjà vu (la sentinelle pointe sur elle-même).
     */
    private static void parcourir(Maillon<?> depart, Set<Maillon<?>> vus, StringBuilder dot) {
        if (vus.contains(depart)) {
            return;
        }
        dot.append(Dessin.noeud(depart));
        vus.add(depart);
        Maillon<?> ref = depart;
        while (!vus.contains(ref.suivant)) {
            dot.append(Dessin.fleche(ref));
            ref = ref.suivant;
            dot.append(Dessin.noeud(ref));
            vus.add(ref);
        }
        // Si on est là, ref.suivant est un maillon déjà dessiné
        dot.append(Dessin.fleche(ref));
    }

    /**
     * Renvoie les lignes Graphviz de la référence n°i : son nom en rouge,
     * placé à côté du maillon pointé, et une flèche rouge vers lui.
     */
    private static String reference(int i, String nom, Maillon<?> cible) {
        String res = "  r" + i + " [label=\"" + nom + "\", shape=plaintext, fontcolor=red];\n";
        String nomCible = Dessin.nom(cible);
        res += "  r" + i + " -> " + nomCible + " [color=red, penwidth=2];\n";
        res += "  { rank=same; r" + i + "; " + nomCible + "; }\n";
        return res;
    }

    /** Renvoie la ligne Graphviz qui déclare le maillon m. */
    private static String noeud(Maillon<?> m) {
        if (m instanceof Sentinelle) {
            return "  " + Dessin.nom(m) + " [label=<<b>S</b>>, style=filled, fillcolor=lightgray];\n";
        }
        String label = String.valueOf(m.data).replace("\\", "\\\\").replace("\"", "\\\"");
        return "  " + Dessin.nom(m) + " [label=\"" + label + "\"];\n";
    }

    /** Renvoie la ligne Graphviz de la flèche de m vers son suivant. */
    private static String fleche(Maillon<?> m) {
        String res = "  " + Dessin.nom(m) + " -> " + Dessin.nom(m.suivant);
        // Flèches lourdes pour garder les maillons alignés en colonne,
        // sauf celle qui remonte vers la sentinelle
        if (!(m.suivant instanceof Sentinelle)) {
            res += " [weight=10]";
        }
        return res + ";\n";
    }

    /** Renvoie le nom Graphviz du maillon m. */
    private static String nom(Maillon<?> m) {
        return "n" + System.identityHashCode(m);
    }
}
