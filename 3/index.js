const fs = require("fs");

const arr = fs.readFileSync("./input.txt", "utf-8").split("\n");

let y = 0;
let x = 0;
let treesForDifferentSlopes = [];

// while (y < arr.length) {
//   x = (x + 3) % arr[y].length;
//   y++;

//   if (y === arr.length) {
//     break;
//   }

//   if (arr[y][x] === "#") {
//     arr[y][x] = "X";
//     trees++;
//   } else {
//     arr[y][x] = "O";
//   }
// }

const traversals = [
  {
    x: 1,
    y: 1,
  },
  {
    x: 3,
    y: 1,
  },
  {
    x: 5,
    y: 1,
  },
  {
    x: 7,
    y: 1,
  },
  {
    x: 1,
    y: 2,
  },
];

traversals.forEach((traversal) => {
  let trees = 0;
  y = 0;
  x = 0;

  while (y < arr.length) {
    x = (x + traversal.x) % arr[y].length;
    y += traversal.y;

    if (y >= arr.length) {
      break;
    }

    if (arr[y][x] === "#") {
      arr[y][x] = "X";
      trees++;
    } else {
      arr[y][x] = "O";
    }
  }

  treesForDifferentSlopes.push(trees);
});

console.log(treesForDifferentSlopes.reduce((acc, curr) => acc * curr, 1));
