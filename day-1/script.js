const fs = require("fs");

const input = fs.readFileSync("./day-1/input.txt", "utf8").trim().split("\n");

function solve1(input) {
  const lefts = [];
  const rights = [];

  input.forEach((line) => {
    const [a, b] = line.split(" ").map(Number);
    lefts.push(a);
    rights.push(b);
  });

  lefts.sort((a, b) => a - b);
  rights.sort((a, b) => a - b);

  const sum = lefts.reduce(
    (acc, left, i) => acc + Math.abs(left - rights[i]),
    0
  );
  console.log(sum);
}

function solve2(input) {
  const counts = {};
  let sum = 0;

  input.forEach((line) => {
    const [a, b] = line.split(" ").map(Number);
    counts[b] = (counts[b] || 0) + 1;
    sum += a * (counts[a] || 0);
  });

  console.log(sum);
}

solve1(input);
solve2(input);
