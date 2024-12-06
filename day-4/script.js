const fs = require("fs");

// Lire le fichier d'entrée
const input = fs.readFileSync("./day-4/input.txt", "utf8").trimEnd();

// Directions pour chercher les mots "XMAS"
const DIRS = [
  [0, 1], // Droite
  [1, 1], // Diagonale bas-droite
  [1, 0], // Bas
  [1, -1], // Diagonale bas-gauche
  [0, -1], // Gauche
  [-1, -1], // Diagonale haut-gauche
  [-1, 0], // Haut
  [-1, 1], // Diagonale haut-droite
];

// Directions spécifiques pour les motifs "X-MAS"
const DIRS2 = [
  [1, 1], // Diagonale bas-droite
  [1, -1], // Diagonale bas-gauche
];

// Correspondance pour les flips M <-> S
const FLIP = {
  M: "S",
  S: "M",
};

// Résoudre la Partie 1 : Compter les occurrences de "XMAS"
function solve1(input) {
  const lines = input.split("\n");
  let count = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === "X") {
        outer: for (const [di, dj] of DIRS) {
          let i2 = i + di;
          let j2 = j + dj;
          for (const char of "MAS") {
            if (lines[i2]?.[j2] !== char) {
              continue outer;
            }
            i2 += di;
            j2 += dj;
          }
          count++;
        }
      }
    }
  }

  console.log('Partie 1 - Nombre de "XMAS" trouvés :', count);
}

// Résoudre la Partie 2 : Compter les motifs "X-MAS"
function solve2(input) {
  const lines = input.split("\n");
  let count = 0;

  for (let i = 1; i < lines.length - 1; i++) {
    outer: for (let j = 1; j < lines[0].length - 1; j++) {
      if (lines[i][j] === "A") {
        for (const [di, dj] of DIRS2) {
          const char1 = lines[i + di][j + dj];
          if (char1 !== "M" && char1 !== "S") {
            continue outer;
          }

          const char2 = lines[i - di][j - dj];
          if (char2 !== FLIP[char1]) {
            continue outer;
          }
        }
        count++;
      }
    }
  }

  console.log('Partie 2 - Nombre de motifs "X-MAS" trouvés :', count);
}

// Appeler les deux fonctions
solve1(input);
solve2(input);
