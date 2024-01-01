const fs = require("fs");

const arr = fs.readFileSync("./input.txt", "utf-8").split("\n");

let obj = {};

// arr.forEach((line) => {
//   const splitBySpace = line.split(" ");
//   const password = splitBySpace[2];
//   const char = splitBySpace[1][0];
//   const [min, max] = splitBySpace[0].split("-");
//   obj[password] = {
//     min: Number(min),
//     max: Number(max),
//     char,
//   };
// });

arr.forEach((line) => {
  const [_, min, max, char, password] = line.match(/(\d+)-(\d+) (\w): (\w+)/);
  obj[password] = {
    firstPosition: Number(min),
    secondPosition: Number(max),
    char,
  };
});

let result = 0;

// part one
// for (const password in obj) {
//   const { min, max, char } = obj[password];
//   const charcount = password.split("").filter((c) => c === char).length;

//   if (charcount >= min && charcount <= max) {
//     result++;
//   }
// }

// part two
for (const password in obj) {
  const { firstPosition, secondPosition, char } = obj[password];
  const firstChar = password[firstPosition - 1];
  const secondChar = password[secondPosition - 1];

  if (firstChar === char && secondChar !== char) {
    result++;
  } else if (firstChar !== char && secondChar === char) {
    result++;
  }
}

console.log(result);
