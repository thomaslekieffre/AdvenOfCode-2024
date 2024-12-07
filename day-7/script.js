const fs = require("fs");

// Lecture du fichier d'entrée contenant les équations
const input = fs.readFileSync("./day-7/input.txt", "utf8").trimEnd();

function canAchieveTargetPart1(target, numbers) {
  // Fonction récursive pour explorer les combinaisons d'opérateurs + et *
  function evaluate(index, currentValue) {
    if (index === numbers.length) {
      return currentValue === target;
    }

    return (
      evaluate(index + 1, currentValue + numbers[index]) || // Addition
      evaluate(index + 1, currentValue * numbers[index]) // Multiplication
    );
  }

  return evaluate(1, numbers[0]);
}

function canAchieveTargetPart2(target, numbers) {
  // Fonction récursive pour explorer les combinaisons d'opérateurs +, *, et ||
  function evaluate(index, currentValue) {
    if (index === numbers.length) {
      return currentValue === target;
    }

    return (
      evaluate(index + 1, currentValue + numbers[index]) || // Addition
      evaluate(index + 1, currentValue * numbers[index]) || // Multiplication
      evaluate(index + 1, Number("" + currentValue + numbers[index])) // Concaténation
    );
  }

  return evaluate(1, numbers[0]);
}

function calculateCalibrationResults(input) {
  const lines = input.split("\n");

  let totalPart1 = 0;
  let totalPart2 = 0;

  lines.forEach((line) => {
    const [target, ...numbers] = line.split(/[: ]+/).map(Number);

    if (canAchieveTargetPart1(target, numbers)) {
      totalPart1 += target;
    }

    if (canAchieveTargetPart2(target, numbers)) {
      totalPart2 += target;
    }
  });

  return { totalPart1, totalPart2 };
}

// Calcul et affichage des résultats
const { totalPart1, totalPart2 } = calculateCalibrationResults(input);

console.log("Total Calibration Result (Part 1):", totalPart1);
console.log("Total Calibration Result (Part 2):", totalPart2);
