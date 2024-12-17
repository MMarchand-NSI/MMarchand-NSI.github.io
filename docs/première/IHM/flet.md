# Interface Homme machine

!!! abstract "Défintion"
    Une Interface Homme-Machine (IHM) est un système qui permet l'interaction entre un utilisateur humain et une machine, souvent un ordinateur ou un appareil numérique. Elle joue un rôle essentiel dans la communication, facilitant la compréhension des commandes de l'utilisateur et le retour d'informations de la machine. Les IHM incluent divers éléments comme des interfaces graphiques (boutons, menus, icônes), vocales, tactiles ou gestuelles. Leur conception vise à être intuitive, ergonomique et accessible, pour améliorer l'expérience utilisateur et optimiser l'efficacité de l'interaction.

## Flet
Flet est un framework open-source permettant de créer des applications web, desktop et mobiles à l'aide de Python. Il simplifie le développement d'interfaces utilisateur interactives sans nécessiter de connaissances approfondies en HTML, CSS ou JavaScript. Basé sur le framework Flutter de Google, Flet offre des composants modernes et adaptatifs pour concevoir des applications performantes et réactives. Idéal pour les développeurs cherchant à rapidement prototyper ou déployer des applications multiplateformes.

### Installation
Ouvrez le terminal de votre environnement et exécutez cette commande pour y installer flet:

```bash
pip install flet
```

### Vérifier que ça marche avec une fenêtre vide

Dans un nouveau répertoire que vous ouvrirez dans VSCode, créez un fichier app.py avec le code suivant:

```python
import flet as ft

def main(page: ft.Page):
    page.title = "Page Flet Vide"
    # à chaque fois qu'un ou plusieurs éléments visuels sont modifiés, il faut appeler page.update()
    page.update() 

# Lancer l'application
ft.app(target=main)
```

### Une application simple

```python
# type: ignore
import flet as ft

def fois_2(x: int) -> int:
    return 2*x

def main(page: ft.Page):
    page.title = "Multiplication par 2"
    page.vertical_alignment = ft.MainAxisAlignment.START  # Alignement au sommet
    page.window.width = 300  # Largeur minimale
    page.window.height = 200  # Hauteur ajustée automatiquement

    # 1. Définir les Controls
    input_text = ft.TextField(label="Entrez un nombre")
    result_label = ft.Text(value="", color="blue")

    # 2. Définir le bouton et son callback dans la fonction main
    def bouton_click(e: ft.Control):
        result_label.value=f"Résultat: {fois_2(int(input_text.value))}"
        page.update()

    bouton = ft.ElevatedButton(
        text="Multiplier par 2",
        on_click=bouton_click) 
    
    #bouton_click est une fonction qui est appelée lorsque le bouton est cliqué.
    #On appelle cette fonction un CALLBACK.

    # 3. Ajouter les widgets à la page
    page.add(
        ft.Text("Application de multiplication par 2", size=20),
        input_text,
        bouton,
        result_label,
    )

ft.app(target=main)
```

### Lancer en tant qu'application web
En ligne de commande, écrire:
```bash
flet run --web app.py
```

Le navigateur devrait se lancer à l'adresse http://127.0.0.1:53283  (le port peut changer)

Comme vous l'avez appris l'année dernière, tout ordinateur est connu sur un réseau via son adresse IP qui est unique.

Quelle que soit son adresse IP, tout ordinateur se connaît lui-même sous l'adresse 127.0.0.1, ou localhost.

C'est un peu lors de la communication entre humains. Si vous vous appelez Bob et que vous avez faim, vous dites "J'ai faim", et pas "Bob a faim".

127.0.0.1, c'est un peu le "Je" des machines sur un réseau. Tout le monde a son "Je", qui s'appelle ici localhost (boucle locale).

Flet a lancé un serveur HTTP sur lequel il sert l'application flet que vous avez créé sur le PORT 53283.

Votre ordinateur est un peu comme un immeuble. Il a une adresse certes, mais il existe plusieurs services qui ont chacun un numéro de porte.

Ici, flet s'est lancé à la porte 53283 de l'immeuble.

Lorsque vous allez sur internet, vous ne spécifiez pas de port. C'est parce qu'il y a des ports par défaut.

- Allez sur www.google.fr:443
- Ca marche, car 443 est le port par défuat pour https, il n'y a pas besoin de le mettre.


### Documentation officielle

La documentation officielle est très bien faite et permet de tester divers contrôles.

[Lien doc flet](https://flet.dev/docs)

!!! question "Pendu"
    Donnez une IHM flet à votre pendu