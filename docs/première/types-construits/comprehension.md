# Listes en compréhension
EN CONSTRUCTION

## Vision 1: Equivalent d'accumulation

```python
acc = []
for x in range(0, 12):
    acc.append(x+2)
```

calcule la même chose que: 

```python
acc = [x+2 for x in range(0, 12)]
```

```python
liste_mots = ["piano", "fraise", "sac", "casquette"]

def au_pluriel(mot: str) -> str:
    return mot + "s"

mots_pluriel = [au_pluriel(m) for m in liste_mots]
```



## Vision 2: Approche ensembliste

Cette vision permet de toucher plus facilement à des concepts mathématiques profonds dont nous effleurons la surface, en même temps qu'elle simplifie en réalité la lecture du code et le rapproche du langage humain.

`range(0, 12)`représente l'ensemble des entiers de 0 à 11 qui peut s'écrire $$\{x|x\in \llbracket 0, 12 \llbracket \}$$

C'est l'ensemble des $x$ TEL QUE chaque $x$ appartient aux entiers de 0 à 12 exclu.

`[x+2 for x in range(0, 12)]` représente $\{x+2|x\in \llbracket 0, 12 \llbracket\}$
Soit l'ensemble des "$x+2$" pour chaque $x$ de l'ensemble des entiers de 0 à 12.

## Exemple sur d'autres itérables

```python
liste_mots = ["piano", "fraise", "sac", "casquette"]

mots_pluriel = [mot + "s" for mot in liste_mots]
```


Ici, on demande l'ensemble des mots de liste_mots mis au pluriel.

Cette syntaxe sert à se rapprocher de plus en plus de l'expressivité du langage humain, et permet par là même de rendre plus facile la résolution de problème.

Voici l'équivalent de ce code dans plusieurs langages:



**Haskell**
```haskell
listeMots = ["piano", "fraise", "sac", "casquette"]
motsPluriel = [mot ++ "s" | mot <- listeMots]
```

**OCaml**
```ocaml
let liste_mots = ["piano"; "fraise"; "sac"; "casquette"]
let mots_pluriel = List.map (fun mot -> mot ^ "s") liste_mots
```

**Scala**
```scala
val listeMots = List("piano", "fraise", "sac", "casquette")
val motsPluriel = listeMots.map(mot => mot + "s")
```

**JavaScript**
```javascript
const listeMots = ["piano", "fraise", "sac", "casquette"];
const motsPluriel = listeMots.map(mot => mot + "s");
```

**Elixir**
```elixir
liste_mots = ["piano", "fraise", "sac", "casquette"]
mots_pluriel = Enum.map(liste_mots, fn mot -> mot <> "s" end)
```

**Gleam**
```gleam
let liste_mots = ["piano", "fraise", "sac", "casquette"]
let mots_pluriel = list.map(fn(mot) { mot ++ "s" }, liste_mots)
```


**Uiua**
```uiua	
ListeMots ← {"piano" "fraise" "sac" "casquette"}
⍚(⊂:@s) ListeMots
```

## Une fonction d'ordre supérieur: `map`

Si je vous indique ces exemples, c'est que si vous y regardez de plus près, un mot revient tout le temps: `map`.

`map` existe aussi en python. On l'appelle une fonction d'ordre supérieur. une fonction d'ordre supérieur est une fonction qui peut prendre en paramètre une fonction, et peut aussi retourner une fonction.

Voici l'équivalent en python:

`mots_pluriel = list(map(au_pluriel, liste_mots))`

`map` applique la fonction en premier paramètre à chacun des éléments de l'ensemble donné en deuxième paramètre. ici on demande une liste en retour, mais on aurait tout aussi bien pu demander un tuple:

`mots_pluriel = tuple(map(au_pluriel, liste_mots))`

ou encore d'autres structures qu'on ne verra pas comme les ensembles:

`mots_pluriel = set(map(au_pluriel, liste_mots))`


### Ajouter une condition - Filtrer

Reprenons notre exemple de mots au pluriel:

```python
liste_mots = ["piano", "fraise", "sac", "casquette"]

def au_pluriel(mot: str) -> str:
    return mot + "s"

mots_pluriel = [au_pluriel(m) for m in liste_mots]
```


ésormais, on veut les mots au pluriel, mais seulement pour les mots de 5 lettres ou moins.

On a donc une condition sur les éléments de l'ensemble de départ, il faut que leur longueur soit inférieure à 6.

Ca s'écrit tout simplement en rajoutant une condition supplémentaire sur les éléments de l'ensemble de départ:

`mots_pluriel = [au_pluriel(m) for m in liste_mots if len(m)<6]`

`Construis une liste où tu renvoies les mots de taille inférieure à 6 mis au pluriel`

Comme tout langage, il faut s'habituer à la façon de parler.

Cette ligne de code est fonctionnellement équivalente à:

```python
acc = []
for m in liste_mots:
    if len(m)<6:
        acc.append(au_pluriel(m))
```

Elle n'est pas techniquement équivalente car les listes en compréhension sont beaucoup plus rapides.

## Une autre fonction d'ordre supérieur: filter

Reprenons notre code, mais sensiblement modifié pour n'utiliser que des fonctions.

```python
liste_mots = ["piano", "fraise", "sac", "casquette"]

def au_pluriel(mot: str) -> str:
    return mot + "s"

def moins_de_6(mot: str) -> str:
    return len(mot)<6

mots_pluriel = [au_pluriel(m) for m in liste_mots if moins_de_6(m)]
```

On peut aussi écrire:
```python
mots_pluriel = list(map(au_pluriel, filter(moins_de_6, m)))
```
Pour aller plus loin:
c'est lourd de définir un tas de petites fonctions. Il existe une manière de directement les créer sans le mot def.

```python
mots_pluriel = list(map(lambda m: m+"s", filter(lambda m: len(m)<6, m)))
```



