const fs = require("fs");

// Lecture du fichier d'entrée
try {
  const input = fs.readFileSync("./day-3/input.txt", "utf8").trimEnd();

  // Fonction principale pour résoudre les deux parties
  function solve(input, part) {
    // Partie 2 : Suppression des sections désactivées entre "don't()" et "do()"
    if (part === 2) {
      input = input.replace(/don't\(\).+?($|do\(\))/gs, "");
    }

    // Correspondance des instructions "mul(X,Y)"
    const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

    // Transformation des correspondances en tableau de nombres
    const nums = Array.from(matches).map((match) => [+match[1], +match[2]]);

    // Calcul de la somme des multiplications valides
    const sum = nums.reduce((acc, [a, b]) => acc + a * b, 0);

    // Affichage du résultat
    console.log(`Résultat pour la partie ${part} :`, sum);
  }

  // Résolution pour les deux parties
  solve(input, 1);
  solve(input, 2);
} catch (error) {
  console.error("Erreur lors de la lecture du fichier :", error);
}
