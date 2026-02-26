# Bases réseaux

## Adresses IP

Une **adresse IP** (version 4) est composée de **4 octets** séparés par des points. Chaque octet est un entier entre 0 et 255.

```
192 . 168 .  1  . 10
 ↑      ↑     ↑    ↑
oct.1  oct.2 oct.3 oct.4
```

En binaire, chaque octet occupe 8 bits. Une adresse IPv4 fait donc **32 bits**, ce qui donne 2³² ≈ 4 milliards d'adresses possibles.

```
192.168.1.10  →  11000000 . 10101000 . 00000001 . 00001010
```

### Réseau et hôte

Une adresse IP est divisée en deux parties :

- la **partie réseau** — identifie le réseau auquel appartient la machine
- la **partie hôte** — identifie la machine au sein de ce réseau

Le **masque de sous-réseau** indique la frontière entre les deux. En notation CIDR, on écrit `/N` où N est le nombre de bits consacrés à la partie réseau.

| Adresse | Masque | Partie réseau | Partie hôte |
|---|---|---|---|
| 192.168.1.10 | /24 (255.255.255.0) | 192.168.1 | 10 |
| 10.0.0.42 | /8 (255.0.0.0) | 10 | 0.0.42 |

Deux machines peuvent communiquer **directement** (sans routeur) si et seulement si elles appartiennent au même réseau.

### Adresses réservées

| Plage | Usage |
|---|---|
| 10.0.0.0/8 | réseau privé (LAN) |
| 172.16.0.0/12 | réseau privé (LAN) |
| 192.168.0.0/16 | réseau privé (LAN) |
| 127.0.0.0/8 | loopback — la machine elle-même |
| 255.255.255.255 | broadcast — tous les hôtes du réseau local |

Les adresses **privées** ne sont pas routées sur Internet. Elles sont utilisées librement dans les réseaux locaux. La traduction vers une adresse publique se fait via le **NAT** (*Network Address Translation*), assuré par le routeur/box.

!!! info "127.0.0.1 — l'adresse qu'on utilise tous les jours en informatique"
    `127.0.0.1` (ou son alias `localhost`) désigne **la machine elle-même**. Un paquet envoyé à cette adresse ne sort jamais sur le réseau : il fait demi-tour dans la pile réseau du système d'exploitation, sans même atteindre la carte réseau.

    C'est l'adresse qu'on utilise en permanence en développement :

    - un serveur web lancé localement écoute sur `http://localhost:8000` ou `http://127.0.0.1:8000`
    - une base de données tourne sur `localhost:5432`
    - deux programmes sur la même machine communiquent via `127.0.0.1` sans jamais toucher au réseau physique

    L'interface loopback (`lo` sous Linux/macOS) est une carte réseau virtuelle, toujours présente, toujours active, même sans connexion réseau. Elle est indispensable au développement logiciel.

!!! info "IPv6"
    Face à l'épuisement des adresses IPv4, le protocole **IPv6** utilise des adresses sur **128 bits**, notées en hexadécimal : `2001:0db8:85a3::8a2e:0370:7334`. Il coexiste aujourd'hui avec IPv4 (dual-stack).

---

## Adresses MAC

Une **adresse MAC** (*Media Access Control*) est l'identifiant physique d'une carte réseau. Elle est gravée en usine dans la ROM de la carte et est censée être **unique à l'échelle mondiale**.

Elle est composée de **6 octets** notés en hexadécimal, séparés par `:` ou `-` :

```
AA:BB:CC:11:22:33
└────────┘ └────────┘
 OUI          numéro de série
(fabricant)    (carte)
```

Les **3 premiers octets** forment l'**OUI** (*Organizationally Unique Identifier*) : ils identifient le fabricant de la carte réseau (attribué par l'IEEE). Les **3 derniers** sont un numéro de série attribué par le fabricant.

| Adresse MAC | Fabricant (OUI) |
|---|---|
| `00:1A:2B:…` | Cisco |
| `3C:22:FB:…` | Apple |
| `B8:27:EB:…` | Raspberry Pi Foundation |

!!! warning "MAC vs IP"
    L'adresse **MAC** est une adresse **physique**, locale : elle n'a de sens que sur le segment réseau direct (entre deux équipements directement connectés). Elle change à chaque routeur traversé.

    L'adresse **IP** est une adresse **logique**, globale : elle reste la même de bout en bout sur Internet.

---

## Ports

Un port est un **entier sur 16 bits** (de 0 à 65 535). Il permet d'identifier une **application** ou un **service** sur une machine. Là où l'adresse IP identifie la machine, le port identifie le processus qui écoute.

La combinaison **IP + port** forme un **socket**, l'extrémité d'une connexion réseau :

```
192.168.1.10 : 443   ←→   192.168.1.20 : 54231
  (serveur HTTPS)              (client, port éphémère)
```

### Plages de ports

| Plage | Nom | Usage |
|---|---|---|
| 0 – 1023 | Ports bien connus | services système (root requis) |
| 1024 – 49151 | Ports enregistrés | applications courantes |
| 49152 – 65535 | Ports dynamiques | ports clients (éphémères) |

### Ports bien connus courants

| Port | Protocole | Service |
|---|---|---|
| 20 / 21 | TCP | FTP (transfert de fichiers) |
| 22 | TCP | SSH (accès distant sécurisé) |
| 25 | TCP | SMTP (envoi de mail) |
| 53 | UDP/TCP | DNS (résolution de noms) |
| 80 | TCP | HTTP |
| 443 | TCP | HTTPS |
| 3306 | TCP | MySQL |
| 5432 | TCP | Postgresql |

---

## Ethernet

**Ethernet** est le protocole standard des réseaux locaux filaires (**LAN**). Il opère aux couches 1 et 2 du modèle OSI et définit comment les données sont transmises sur le câble.

Il est standardisé par l'**IEEE 802.3** et a évolué en plusieurs générations :

| Standard | Débit | Câble typique |
|---|---|---|
| Ethernet | 10 Mbps | coaxial, paire torsadée |
| Fast Ethernet | 100 Mbps | Cat5 |
| Gigabit Ethernet | 1 Gbps | Cat5e / Cat6 |
| 10 Gigabit Ethernet | 10 Gbps | Cat6a / fibre |

Le connecteur standard est le **RJ45** (8 broches). Le câble transporte les données sous forme de signaux électriques différentiels sur des paires de fils torsadés.

### Topologie

Dans un réseau Ethernet moderne, les machines sont reliées à un **switch** (commutateur) en topologie **étoile**. Le switch lit les adresses MAC des trames pour les acheminer uniquement vers le bon port de destination — contrairement à l'ancien hub qui diffusait à tout le monde.

```
  PC1 ──┐
  PC2 ──┤── Switch ── Routeur ── Internet
  PC3 ──┘
```

---

## Carte réseau

La **carte réseau** (NIC — *Network Interface Card*) est le composant matériel qui relie une machine au réseau. Elle assure la conversion entre les données numériques internes et les signaux transmis sur le support physique.

### Ce qu'elle contient

- une **adresse MAC** gravée en usine (identifiant physique permanent)
- un **contrôleur** qui gère l'encodage/décodage des signaux
- un **connecteur** RJ45 (Ethernet filaire) ou une antenne (Wi-Fi)

### Ce qu'elle reçoit

- une **adresse IP** assignée dynamiquement par **DHCP** (*Dynamic Host Configuration Protocol*) ou configurée statiquement par l'administrateur
- un **masque de sous-réseau**
- l'adresse IP de la **passerelle par défaut** (le routeur)

 