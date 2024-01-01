// const fs = require("fs");

// const arr = fs.readFileSync("./input.txt", "utf-8").split("\n\n");

// const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

// let validPassports = 0;

// arr.forEach((passport) => {
//   const lines = passport.split("\n");
//   let fields = [];
//   lines.forEach((line) => {
//     const keyValuePairs = line.split(" ");
//     keyValuePairs.forEach((keyValuePair) => {
//       const [key] = keyValuePair.split(":");
//       fields.push(key);
//     });
//   });

//   if (requiredFields.every((field) => fields.includes(field))) {
//     validPassports++;
//   }
// });

// console.log(validPassports);

// more efficient
// const fs = require("fs");

// const arr = fs.readFileSync("./input.txt", "utf-8").split("\n\n");
// const requiredFields = new Set([
//   "byr",
//   "iyr",
//   "eyr",
//   "hgt",
//   "hcl",
//   "ecl",
//   "pid",
// ]);

// let validPassports = 0;

// arr.forEach((passport) => {
//   const fields = new Set(passport.match(/\b\w+(?=:)/g));
//   if (Array.from(requiredFields).every((field) => fields.has(field))) {
//     validPassports++;
//   }
// });

// part two

const fs = require("fs");

const arr = fs.readFileSync("./input.txt", "utf-8").split("\n\n");
const requiredFields = new Set([
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
]);

const validEyeColors = new Set([
  "amb",
  "blu",
  "brn",
  "gry",
  "grn",
  "hzl",
  "oth",
]);

const rules = {
  byr: (value) => {
    return value.length === 4 && value >= 1920 && value <= 2002;
  },
  iyr: (value) => {
    return value.length === 4 && value >= 2010 && value <= 2020;
  },
  eyr: (value) => {
    return value.length === 4 && value >= 2020 && value <= 2030;
  },
  hgt: (value) => {
    if (!value.endsWith("cm") && !value.endsWith("in")) {
      return false;
    }

    const unit = value.slice(-2);
    const height = parseInt(value.slice(0, -2));

    if (unit === "cm") {
      return height >= 150 && height <= 193;
    } else {
      return height >= 59 && height <= 76;
    }
  },
  hcl: (value) => {
    return /^#[0-9a-f]{6}$/.test(value);
  },
  ecl: (value) => {
    return validEyeColors.has(value);
  },
  pid: (value) => {
    return /^[0-9]{9}$/.test(value);
  },
};

let validPassports = 0;

arr.forEach((passport) => {
  const fields = new Map(
    passport.match(/(\b\w+(?=:)):(\S+)/g).map((field) => field.split(":"))
  );

  // Check if all required fields are present
  if (!Array.from(requiredFields).every((field) => fields.has(field))) {
    return; // Skip to the next passport if any required field is missing
  }

  // Validate field values
  for (const [key, value] of fields) {
    if (key !== "cid" && !rules[key](value)) {
      return; // Skip to the next passport if any field is invalid
    }
  }

  validPassports++; // Increment only if all checks are passed
});

console.log(validPassports);
