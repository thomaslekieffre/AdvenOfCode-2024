const fs = require("fs");

// Lecture du fichier d'entrée
const input = fs.readFileSync("./day-2/input.txt", "utf8").trim();

// Étape 1 : Transformer les données en tableau de rapports
const reports = input.split("\n").map((line) => {
  // Chaque ligne est transformée en tableau de nombres
  return line.split(" ").map(Number);
});

// Fonction pour vérifier si un rapport est sûr (Partie 1)
function isSafe(report) {
  // Étape 2 : Calculer les différences entre les niveaux adjacents
  const differences = [];
  for (let i = 0; i < report.length - 1; i++) {
    differences.push(report[i + 1] - report[i]);
  }

  // Vérifier si toutes les différences sont entre 1 et 3 (ou -1 et -3)
  const validDifferences = differences.every(
    (diff) => Math.abs(diff) >= 1 && Math.abs(diff) <= 3
  );

  // Vérifier si les niveaux sont tous croissants ou tous décroissants
  const allIncreasing = differences.every((diff) => diff > 0);
  const allDecreasing = differences.every((diff) => diff < 0);

  // Un rapport est sûr si les deux conditions sont respectées
  return validDifferences && (allIncreasing || allDecreasing);
}

// Fonction pour tester si un rapport peut devenir sûr en supprimant un niveau (Partie 2)
function canBecomeSafe(report) {
  // Essayer de supprimer chaque niveau
  for (let i = 0; i < report.length; i++) {
    // Créer un nouveau rapport sans le niveau à l'index `i`
    const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
    // Vérifier si ce rapport modifié est sûr
    if (isSafe(modifiedReport)) {
      return true;
    }
  }
  // Si aucune suppression ne rend le rapport sûr, retourner false
  return false;
}

// Compter les rapports sûrs pour les deux parties
let safeCountPart1 = 0;
let safeCountPart2 = 0;

for (let i = 0; i < reports.length; i++) {
  // Partie 1 : Compter les rapports sûrs normaux
  if (isSafe(reports[i])) {
    safeCountPart1++;
  }

  // Partie 2 : Compter les rapports sûrs en tenant compte du Problem Dampener
  if (isSafe(reports[i]) || canBecomeSafe(reports[i])) {
    safeCountPart2++;
  }
}

// Afficher les résultats
console.log("Partie 1 :", safeCountPart1);
console.log("Partie 2 :", safeCountPart2);
