const fs = require("fs");

// Lecture du fichier d'entrée contenant la carte
// Suppression des espaces vides en fin de fichier pour éviter les erreurs
const input = fs.readFileSync("./day-6/input.txt", "utf8").trimEnd();

// Définition des directions possibles : haut, droite, bas, gauche
const DIRS = [
  [-1, 0], // Haut
  [0, 1], // Droite
  [1, 0], // Bas
  [0, -1], // Gauche
];

// Fonction principale pour simuler le mouvement dans la carte
function run(map, start) {
  let dirIdx = 0; // Direction initiale (0 correspond à "haut")
  let [dy, dx] = DIRS[0]; // Définir le déplacement initial selon DIRS
  let [y, x] = start; // Position de départ
  const seen = map.map((row) => row.map(() => [])); // Créer une matrice pour suivre les directions déjà explorées

  // Boucle principale : tant qu'on est dans la carte
  while (map[y]?.[x] !== undefined) {
    // Si on a déjà visité cette cellule dans cette direction, on détecte une boucle
    if (seen[y][x].includes(dirIdx)) {
      return {
        seen, // Carte des cellules explorées
        loops: 1, // Indique qu'une boucle a été trouvée
      };
    }

    // Ajouter la direction actuelle comme explorée pour cette cellule
    seen[y][x].push(dirIdx);

    // Calcul de la position suivante
    let y2 = y + dy;
    let x2 = x + dx;

    // Si la position suivante est un mur (1), on change de direction
    while (map[y2]?.[x2] === 1) {
      dirIdx = (dirIdx + 1) % 4; // Passer à la direction suivante
      [dy, dx] = DIRS[dirIdx]; // Mettre à jour le déplacement
      y2 = y + dy;
      x2 = x + dx;
    }

    // Mettre à jour la position courante pour continuer la simulation
    [y, x] = [y2, x2];
  }

  // Retourner la carte des cellules explorées et indiquer qu'aucune boucle n'a été trouvée
  return {
    seen,
    loops: 0,
  };
}

// Fonction principale pour résoudre le problème
function solve(input) {
  let start; // Position de départ
  const map = input.split("\n").map((row, i) =>
    row.split("").map((char, j) => {
      if (char === "^") {
        start = [i, j]; // Identifier la position initiale marquée par "^"
      }
      return char === "#" ? 1 : 0; // Convertir la carte : "#" -> mur (1), "." -> vide (0)
    })
  );

  // Exécuter la simulation depuis la position de départ
  const { seen } = run(map, start);

  // Compter les cellules visitées au moins une fois
  const flatSeen = seen.flat(); // Aplatir la matrice pour simplifier l'analyse
  console.log(flatSeen.filter((arr) => arr.length).length); // Afficher le nombre de cellules visitées

  let count = 0; // Compteur pour le nombre de boucles détectées

  // Parcourir chaque cellule de la carte
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      // Si une cellule n'a pas été visitée, on passe à la suivante
      if (!seen[i] || !seen[i][j] || !seen[i][j].length) {
        continue;
      }

      // Bloquer la cellule actuelle en la transformant en mur
      map[i][j] = 1;

      // Exécuter une nouvelle simulation pour voir si cela crée une boucle
      const { loops } = run(map, start);
      count += loops; // Ajouter le nombre de boucles détectées

      // Réinitialiser la cellule à son état précédent
      map[i][j] = 0;
    }
  }

  // Afficher le nombre total de boucles détectées
  console.log(count);
}

// Appeler la fonction solve avec l'entrée fournie
solve(input);
