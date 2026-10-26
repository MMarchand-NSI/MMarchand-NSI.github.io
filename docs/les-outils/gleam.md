# Gleam, l'atelier

Tout ce qu'il faut pour écrire et lancer du Gleam. À faire **une fois**, au début du chapitre sur les listes. Le cours lui-même est [ici](../terminale/structures-de-donnees/listes/listes.md).

## Installer

Dans un terminal, **à la racine de ton dépôt de cours** :

```bash
nsi install gleam
```

La commande installe Gleam et crée dans ton dépôt un répertoire `prog_gleam/`, déjà prêt :

```text
prog_gleam/
  gleam.toml     la description du projet, tu n'y touches pas
  src/           ton code
  test/          tes tests
```

Deux réponses qui ne sont pas des erreurs. Si la commande dit qu'elle ne sait pas où est ton dépôt, lance `nsi init`, puis de nouveau `nsi install gleam`. Si `gleam` reste introuvable ensuite, ouvre un nouveau terminal.

## Faire tourner ton premier programme

1. Place-toi dans le projet : `cd prog_gleam`

2. Crée le fichier `src/liste.gleam` et écris-y le type, puis un `main` :

    ```gleam
    pub type Liste(a) {
      Vide
      Cons(a, Liste(a))
    }

    pub fn main() {
      let exemple = Cons(2, Cons(3, Cons(4, Vide)))
      echo exemple
    }
    ```

3. Exécute, depuis `prog_gleam/` :

    ```bash
    gleam run -m liste
    ```

Tu dois lire exactement ceci :

```text
src/liste.gleam:8
Cons(2, Cons(3, Cons(4, Vide)))
```

- `echo` affiche le fichier et le **numéro de la ligne**, puis la valeur. C'est ta façon d'observer une liste.
- `-m liste` lance le `main` du module `liste`, c'est-à-dire ton fichier `src/liste.gleam`. **Tout le code du chapitre va dans ce fichier.**

## Tester

Crée **une seule fois** le fichier `test/liste_test.gleam`, avec cette ligne en tête :

```gleam
import liste.{Cons, Vide}
```

Le répertoire `test/` contient déjà un fichier `prog_gleam_test.gleam` : **laisse-le**, c'est lui qui lance tous les tests.

Chaque exercice du cours te donne un bloc « Le test » : colle-le **à la fin** de ce fichier. Puis, depuis `prog_gleam/` :

```bash
gleam test
```

Un point vert par test réussi. Quand un test échoue, Gleam dit où et quoi :

```text
assert test/liste_test.gleam:12
 test: liste_test.somme_test
 code: assert liste.somme(l) == 9
 left: 0
right: 9
```

`left` est ce que **ta** fonction a renvoyé, `right` ce qu'on attendait.

## La police soude certains symboles

Pour que le code soit agréable à lire, la police du site **soude** quelques paires de symboles en un seul dessin. Ce dessin n'est sur aucune touche de ton clavier : tu tapes bien les **deux** caractères, collés, sans espace entre eux.

| Tu tapes | La page affiche | Ce que c'est |
|---|---|---|
| `-` puis `>` | `->` | la flèche d'un cas de `case`, et celle entre deux maillons d'une liste |
| `=` puis `=` | `==` | le test d'égalité, à ne pas confondre avec le `=` d'une affectation |
| `!` puis `=` | `!=` | « différent de » |
| `<` puis `>` | `<>` | coller deux chaînes bout à bout |
| <code>&#124;</code> puis `>` | <code>&#124;&gt;</code> | le *pipe* |

Le bouton de copie, lui, rend les vrais caractères : un bloc copié puis collé dans ton éditeur est toujours correct.

### Avoir la même police dans VSCode

La police du site est **JetBrains Mono**, elle est gratuite, et ton éditeur peut l'utiliser aussi.

1. Télécharge-la sur [jetbrains.com/lp/mono](https://www.jetbrains.com/lp/mono/), décompresse l'archive, sélectionne tous les fichiers `.ttf` qu'elle contient, clic droit, **Installer**.

    Si tu travailles dans WSL, installe-la **côté Windows** : c'est Windows qui dessine la fenêtre de VSCode.

2. Dans VSCode, `Ctrl+Shift+P`, tape `settings json`, choisis **Preferences: Open User Settings (JSON)**, et ajoute ces deux lignes :

    ```json
    "editor.fontFamily": "'JetBrains Mono', Consolas, monospace",
    "editor.fontLigatures": true
    ```

    La seconde n'est pas facultative : sans elle, la police est bien là, mais elle ne soude rien.

3. Ferme et rouvre VSCode.
