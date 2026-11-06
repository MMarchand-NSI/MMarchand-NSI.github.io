# Java, l'atelier

Tout ce qu'il faut pour écrire et lancer du Java. À faire **une fois**, au début du chapitre sur les listes chaînées en objet. Le cours lui-même est en deux pages, [Maillons et sentinelle](../terminale/structures-de-donnees/listes/maillons.md) puis [La liste chaînée](../terminale/structures-de-donnees/listes/liste.md).

Tu n'as pas à apprendre Java. Ce que tu connais en Python est suffisant pour que tu ne sois pas perdu, et cette page tient les quelques correspondances dont tu auras besoin.

## Installer

Dans un terminal :

```bash
nsi install openjdk
```

Puis, dans VSCode :

1. Crée un **profil Java vide**, et active-le. Un profil par langage évite de charger toutes les extensions en même temps, et ton éditeur reste rapide.

2. Dans ce profil, installe ces deux extensions :

    | Identifiant | Ce qu'elle apporte |
    |---|---|
    | `redhat.java` | la coloration, l'autocomplétion et les erreurs au fil de la frappe |
    | `vscjava.vscode-java-test` | le panneau de tests et les flèches vertes dans la marge |

À la première ouverture de ton répertoire de code, l'extension prépare le projet en arrière-plan. Cela prend quelques secondes, et les flèches vertes n'apparaissent qu'ensuite.

## Où va ton code

Dans un répertoire `java/` de ton dépôt, un sous-répertoire par chapitre. Pour les listes :

```text
java/
  listes/
    Maillon.java        la brique
    Sentinelle.java     la fin de la chaîne
    Dessin.java         l'outil qui dessine, donné
    MaillonTest.java    les tests de Maillon
    Liste.java          la liste
    ListeTest.java      les tests de Liste
```

!!! info "Une classe, un fichier"
    Java impose que le fichier porte le **nom de la classe** qu'il contient. `class Maillon` va donc dans `Maillon.java`, et nulle part ailleurs. Si tu te trompes, le message le dit en toutes lettres :

    ```text
    Liste.java:1: error: class Maillon is public, should be declared in a file named Maillon.java
    ```

## Java, ce qui change

| Python | Java | |
| --- | --- | --- |
| `class Maillon[T]:` | `class Maillon<T> {` | crochets contre chevrons |
| `self.data = data` dans `__init__` | `T data;` déclaré dans la classe | l'attribut est **déclaré**, avec son type |
| `def __init__(self, ...)` | `Maillon(T data, ...)` | le constructeur porte le nom de la classe, et `self` disparaît |
| `self.data` | `this.data` | `this` existe, mais il n'est pas un paramètre |
| `Maillon(2, s)` | `new Maillon<>(2, s)` | `new`, et les chevrons vides suffisent, Java retrouve le type |
| `None` | `null` | |
| `-> None` | `void` | |
| `a is b` | `a == b` | |
| `a == b` | `a.equals(b)` | |
| `raise ValueError("x")` | `throw new IllegalArgumentException("x")` | |
| `class Liste[T](Sentinelle[T]):` | `class Liste<T> extends Sentinelle<T>` | |
| `super().__init__()` | `super()` | |

!!! warning "`==` ne compare pas ce que tu crois"
    En Java, `==` et `!=` comparent **toujours** des références : c'est le `is` de Python, jamais le `==` de Python. Pour comparer deux valeurs, il faut écrire `a.equals(b)`.

    Le cas qui pique, et sur lequel tout le monde se fait prendre une fois : Java garde en cache les `Integer` de `-128` à `127`. Donc entre deux objets différents, `100 == 100` est **vrai** et `1000 == 1000` est **faux**. Un code écrit avec `==` passe sur les petits nombres et échoue sur les grands.

## Lancer les tests

Il n'y a rien à taper. Chaque test porte une **flèche verte** dans la marge de gauche, qui le lance seul, et le panneau **Testing** de VSCode les lance tous.

!!! info "Si les lignes `import org.junit...` sont soulignées"
    Clique sur l'ampoule en début de ligne et choisis d'ajouter **JUnit 5** au projet. L'extension l'embarque, il n'y a rien à télécharger.

## Les trois assertions

Un test est une méthode précédée de `@Test`, et d'un `@DisplayName` qui donne la phrase affichée dans le panneau. Elle ne prend rien, ne renvoie rien, et **échoue bruyamment** si le code est faux.

```java
@Test
@DisplayName("append ajoute en fin, ajouterDebut en tête")
void ajouts() {
    Liste<Integer> l = L(1, 2);
    l.ajouterDebut(0);
    assertEquals(List.of(0, 1, 2), contenu(l));
}
```

Trois assertions suffisent à tout ce que tu auras à vérifier.

| Assertion | Ce qu'elle demande |
|---|---|
| `assertEquals(attendu, obtenu)` | ont-ils la **même valeur** |
| `assertSame(attendu, obtenu)` | est-ce le **même objet**, c'est le `==` de Java |
| `assertThrows(UneException.class, () -> code)` | le code **lève**-t-il bien cette exception |

Chacune accepte un **dernier argument facultatif**, un message qui s'affiche quand elle échoue. Prends l'habitude de l'écrire : c'est lui qui te dira ce que tu voulais vérifier, trois jours plus tard.

## Quand un test échoue

VSCode affiche le message de l'échec et la ligne fautive, sur laquelle tu peux cliquer. Avec `assertEquals`, il se lit tout seul :

```text
expected: <[0, 1, 2, 3]> but was: <[0, 1, 2]>
    ListeTest.ajouts(ListeTest.java:28)
```

`expected` est ce qu'on attendait, `but was` ce que **ton** code a produit.

Avec `assertSame`, le message surprend la première fois :

```text
9 est juste après 1 ==> expected: <Maillon@7c137fd5> but was: <Maillon@183ec003>
```

Ce qui précède `==>` est le message que le test portait en dernier argument. Ce qui suit n'est pas du charabia : `Maillon@7c137fd5` est l'**identité** d'un objet, sa carte d'identité en mémoire. Deux identités différentes veulent dire deux objets différents, et c'est exactement ce qu'`assertSame` reproche. Le contenu des deux objets peut très bien être le même.
