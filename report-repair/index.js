const fs = require("fs");

const arr = fs.readFileSync("./input.txt", "utf-8").split("\n").map(Number);

let result = 0;

const arrSet = new Set(arr);

// part 1, efficient
// for (const num of arr) {
//   const diff = 2020 - num; // Sum would be a number minus the current number, because adding the current number to the sum would be 2020
//   if (arrSet.has(diff)) {
//     result = num * diff;
//     break;
//   }
// }

// Brute force part 2
// outer: for (let i = 0; i < input.length; i++) {
//   for (let j = i + 1; j < input.length; j++) {
//     for (let k = j + 1; k < input.length; k++) {
//       if (input[i] + input[j] + input[k] === 2020) {
//         result = input[i] * input[j] * input[k];
//         break outer;
//       }
//     }
//   }
// }

console.log(result);
