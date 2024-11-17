# Chaînes de caractères (str)

Les **chaînes de caractères** (strings, ou `str`) en Python sont des séquences immuables de caractères utilisées pour manipuler du texte.

---

## **Création d'une chaîne**
- Les chaînes peuvent être entourées de guillemets simples (`'`) ou doubles (`"`).
  ```python
  s1 = 'Hello'
  s2 = "World"
  ```
- Pour des chaînes multi-lignes, utilisez des triples guillemets.
  ```python
  s3 = """Ceci
  est une chaîne multi-lignes."""
  ```

---

## **Propriétés principales**
- **Immutabilité** : Une chaîne ne peut pas être modifiée après sa création. Toute opération qui semble "modifier" une chaîne retourne une nouvelle chaîne.
- **Indexation** : Les caractères sont accessibles via leur position (index).
  ```python
  s = "Python"
  print(s[0])   # 'P'
  print(s[2])   # 't'
  print(s[-1])  # 'n' (index négatif pour accéder à la fin)
  print(s[12])  # IndexError
  ```

---

## **Opérations courantes**
1. **Concaténation et répétition** :
   ```python
   s1 = "Hello"
   s2 = "World"
   print(s1 + " " + s2)  # 'Hello World'
   print(s1 * 3)  # 'HelloHelloHello'
   ```

2. **:fire:Slicing (super pratique)** : Extraire une sous-chaîne.
   ```python
   s = "Python"
   print(s[1:4])  # 'yth' (index 1 à 3)
   print(s[:3])   # 'Pyt' (début à index 2)
   print(s[3:])   # 'hon' (index 3 à la fin)
   ```

3. **Longueur** :
   ```python
   print(len("Hello"))  # 5
   ```

4. **Appartenance** :
   ```python
   print('P' in "Python")  # True
   print('z' not in "Python")  # True
   ```

---

## **Formattage de chaînes avec des `f-strings`**

```python
name = "Alice"
age = 25
print(f"Je m'appelle {name} et j'ai {age} ans.")  # 'Je m'appelle Alice et j'ai 25 ans.'
```

---

## **Quelques méthodes utiles spécifiques aux str (ne pas apprendre par coeur)**
Les chaînes disposent de nombreuses méthodes intégrées utiles comme par exemple:    

- **Manipulation** :
```python
s = "  Python  "
print(s.lower())  # '  python  '
print(s.upper())  # '  PYTHON  '
print(s.strip())  # 'Python' (supprime les espaces)
print(s.replace("Py", "My"))  # '  Mython  '
```

- **Test de contenu** :
  ```python
  s = "123"
  print(s.isdigit())  # True
  print("abc".isalpha())  # True
  print("abc123".isalnum())  # True
  ```

---
