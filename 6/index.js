const fs = require("fs");

const arr = fs.readFileSync("./input.txt", "utf-8").split("\n\n");

// Part 1
// let totalQuestionsAnswered = 0;

// arr.forEach((group) => {
//   const charactersSet = new Set();
//   const questionPerPerson = group.split("\n");

//   questionPerPerson.filter(Boolean).forEach((questionAnsweredPerPerson) => {
//     for (let i = 0; i < questionAnsweredPerPerson.length; i++) {
//       const char = questionAnsweredPerPerson[i];
//       charactersSet.add(char);
//     }
//   });

//   totalQuestionsAnswered += charactersSet.size;
// });

console.log(totalQuestionsAnswered);
