# Prendre un peu de recul

Prenons un peu de recul en regardant comment ça se passe dans d'autres langages de programmation.

## Les entiers

En rust, comme dans d'autres langages, il faut préciser le nombre de bits qu'on utilise pour stocker notre variable



```rust
#![allow(unused_assignments)]
#![allow(dead_code)]

fn main() {
    exercice1();
}

fn exercice1() {
    let i: u8 = 100;
    println!("Valeur de i: {}", i);
    println!("Adresse de i dans la RAM: {:p}", &i);
    let j: u8 = 120;
    println!("Différence: {}", i-j);
    println!("Addition: {}", i+j);
}

fn exercice1_sol() {
    let i: i16 = 100;
    println!("Valeur de i: {}", i);
    println!("Adresse de i dans la RAM: {:p}", &i);
    let j: i16 = 120;
    println!("Différence: {}", i-j);
    println!("Addition: {}", i+j);
}

fn exercice2() {
    let i: i8 = 100;
    println!("Valeur de i: {}", i);
    println!("Adresse de i dans la RAM: {:p}", &i);
    i = i+1;
    println!("Valeur de i: {}", i);
    println!("Adresse de i dans la RAM: {:p}", &i);
}

fn exercice2_sol() {
    let mut i: i8 = 100;
    println!("Valeur de i: {}", i);
    println!("Adresse de i dans la RAM: {:p}", &i);
    i = i+1;
    println!("Valeur de i: {}", i);
    println!("Adresse de i dans la RAM: {:p}", &i);
    
}

fn exercice3_sol() {
    let s1 = String::from("bonjour");
    println!("Adresse de s1 dans la RAM: {:p}", &s1);
    let s2 = s1;
    println!("Adresse de s2 dans la RAM: {:p}", &s2);
}

fn exercice3_sol() {
    let s1 = String::from("bonjour");
    let s2 = s1.clone();
    println!("{}", s1);
}
```


Exemple d'erreur en C, mais qui n'intervient qu'à l'exécution.
En C, on est obligé de réserver soi même la mémoire pour nos variables, et de la libérer quand on n'en a plus besoin.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char *s1 = malloc(20);
    strcpy(s1, "bonjour");

    char *s2 = s1;  // s2 pointe vers la même zone que s1

    printf("Valeur de s1 %s \n", s1);  // affichage de la valeur stockée par s1
    printf("Valeur de s2 %s \n", s2);  // affichage de la valeur stockée par s2
    
    // Adresse des variables (différentes)
    printf("Adresse de s1 (la variable) : %p\n", (void*)&s1);
    printf("Adresse de s2 (la variable) : %p\n", (void*)&s2);

    // Adresse mémoire pointée par les variables (identique)
    printf("Adresse pointée par s1 : %p\n", (void*)s1);
    printf("Adresse pointée par s2 : %p\n", (void*)s2);

    free(s1);  // libère la mémoire
    free(s2);  // ❌ erreur : tentative de libération d'une mémoire déjà libérée
    
    return 0;
}
```
