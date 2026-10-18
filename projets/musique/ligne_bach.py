"""Module fourni : la ligne du Canon a 2 cancrizans de J. S. Bach (Offrande musicale, BWV 1079).

Chaque note est un couple (nom, durée). Le nom suit la convention de son.py :
"do4" est le do du milieu du clavier, "mib4" un mi bémol, "fa#4" un fa dièse.
La durée est un nombre de croches : 1 pour une croche, 2 pour une noire,
4 pour une blanche. Une mesure dure 8 croches.

Une note qui dure sur deux mesures (une note liée) est écrite une seule fois,
avec sa durée totale, sur la ligne de la mesure où elle commence.

Ne pas le modifier.
"""

LIGNE: list[tuple[str, int]] = [
    ("do4", 4), ("mib4", 4),  # mesure 1
    ("sol4", 4), ("lab4", 4),  # mesure 2
    ("si3", 4), ("silence", 2), ("sol4", 4),  # mesure 3
    ("fa#4", 4), ("fa4", 4),  # mesure 4
    ("mi4", 4), ("mib4", 4),  # mesure 5
    ("re4", 2), ("reb4", 2), ("do4", 2),  # mesure 6
    ("si3", 2), ("sol3", 2), ("do4", 2), ("fa4", 2),  # mesure 7
    ("mib4", 4), ("re4", 4),  # mesure 8
    ("do4", 4), ("mib4", 4),  # mesure 9
    ("sol4", 1), ("fa4", 1), ("sol4", 1), ("do5", 1), ("sol4", 1), ("mib4", 1), ("re4", 1), ("mib4", 1),  # mesure 10
    ("fa4", 1), ("sol4", 1), ("la4", 1), ("si4", 1), ("do5", 1), ("mib4", 1), ("fa4", 1), ("sol4", 1),  # mesure 11
    ("lab4", 1), ("re4", 1), ("mib4", 1), ("fa4", 1), ("sol4", 1), ("fa4", 1), ("mib4", 1), ("re4", 1),  # mesure 12
    ("mib4", 1), ("fa4", 1), ("sol4", 1), ("lab4", 1), ("sib4", 1), ("lab4", 1), ("sol4", 1), ("fa4", 1),  # mesure 13
    ("sol4", 1), ("lab4", 1), ("sib4", 1), ("do5", 1), ("reb5", 1), ("sib4", 1), ("lab4", 1), ("sol4", 1),  # mesure 14
    ("la4", 1), ("si4", 1), ("do5", 1), ("re5", 1), ("mib5", 1), ("do5", 1), ("si4", 1), ("la4", 1),  # mesure 15
    ("si4", 1), ("do5", 1), ("re5", 1), ("mib5", 1), ("fa5", 1), ("re5", 1), ("sol4", 1), ("re5", 1),  # mesure 16
    ("do5", 1), ("re5", 1), ("mib5", 1), ("fa5", 1), ("mib5", 1), ("re5", 1), ("do5", 1), ("si4", 1),  # mesure 17
    ("do5", 2), ("sol4", 2), ("mib4", 2), ("do4", 2),  # mesure 18
]
