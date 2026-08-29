PRAGMA foreign_keys=1;

-- Création des tables
CREATE TABLE Artistes (
    ArtisteId INT PRIMARY KEY,
    Nom VARCHAR(50)
);

CREATE TABLE Albums (
    AlbumId INT PRIMARY KEY,
    ArtisteId INT,
    Titre VARCHAR(100),
    FOREIGN KEY (ArtisteId) REFERENCES Artistes(ArtisteId)
);

-- Insertion de données dans Artistes
INSERT INTO Artistes (ArtisteId, Nom) VALUES
(1, 'Mozart'),
(2, 'Beethoven'),
(3, 'Chopin');

-- Insertion de données dans Albums
INSERT INTO Albums (AlbumId, ArtisteId, Titre) VALUES
(1, 1, 'Requiem'),
(2, 1, 'Symphonie No. 40'),
(3, 2, 'Sonate Waldstein'),
(4, 3, 'Nocturnes');