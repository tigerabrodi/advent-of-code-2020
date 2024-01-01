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
let totalQuestionsAnsweredByAllInGroup = 0;

arr.forEach((group) => {
  const personAnswers = group.split("\n").filter(Boolean);

  // Initialize the set of questions with the first person's answers
  let commonQuestions = new Set(personAnswers[0]);

  personAnswers.forEach((answers) => {
    const currentPersonAnswers = new Set(answers);
    commonQuestions = new Set(
      [...commonQuestions].filter((x) => currentPersonAnswers.has(x))
    );
  });

  totalQuestionsAnsweredByAllInGroup += commonQuestions.size;
});

console.log(totalQuestionsAnsweredByAllInGroup);
