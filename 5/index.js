const fs = require("fs");

const arr = fs.readFileSync("./input.txt", "utf-8").split("\n");

// FBFBBFFRLR
// First 7 characters will either be F or B
// F means to take the lower half -> 0-63
// B means to take the upper half -> 32-63

let seatIds = [];

arr.forEach((seat) => {
  let startRow = 0;
  let endRow = 127;

  let startColumn = 0;
  let endColumn = 7;

  const rowChars = seat.slice(0, 7);
  const columnChars = seat.slice(7);

  for (let i = 0; i < rowChars.length; i++) {
    const char = rowChars[i];

    if (char === "F") {
      endRow = Math.floor((startRow + endRow) / 2);
    } else {
      startRow = Math.ceil((startRow + endRow) / 2);
    }
  }

  for (let i = 0; i < columnChars.length; i++) {
    const char = columnChars[i];

    if (char === "L") {
      endColumn = Math.floor((startColumn + endColumn) / 2);
    } else {
      startColumn = Math.ceil((startColumn + endColumn) / 2);
    }
  }

  seatIds.push(startRow * 8 + startColumn);
});
