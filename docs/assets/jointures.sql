
PRAGMA foreign_keys=1;

CREATE TABLE t1 (
    idt1 INT PRIMARY KEY,
    a VARCHAR(50),
    b VARCHAR(50)
);

CREATE TABLE t2 (
    idt2 INT PRIMARY KEY,
    idt1 INT,
    c INT,
    FOREIGN KEY (idt1) REFERENCES t1(idt1)
);

-- Insertion de données dans t1
INSERT INTO t1 (idt1, a, b) VALUES
(1, 'Alpha', 'Beta'),
(2, 'Gamma', 'Delta'),
(3, 'Epsilon', 'Zeta'),
(4, 'Eta', 'Theta');

-- Insertion de données dans t2
INSERT INTO t2 (idt2, idt1, c) VALUES
(10, 3, 100),
(11, 4, 200),
(12, 4, 700)
;
