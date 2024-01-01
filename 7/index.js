// pale cyan bags contain 2 posh black bags, 4 wavy gold bags, 2 vibrant brown bags.
// dull lavender bags contain 3 pale tomato bags.
// light red bags contain 3 wavy teal bags, 3 plaid aqua bags, 4 drab lavender bags, 2 bright coral bags.
// wavy green bags contain 3 wavy indigo bags.
// bright blue bags contain 5 vibrant tan bags.

// Objective, looking for the number of bags that can contain a shiny gold bag

// Bags can directly contain shiny gold bags or indirectly if containing bags that can contain shiny gold bags
const fs = require("fs");

const rules = fs.readFileSync("./input.txt", "utf-8").split("\n");
const bagRules = new Map(); // To store each bag and what it can contain

// Regex to parse the rules
// Example regex pattern (you might need to adjust it based on actual input)

const ruleRegex = /^(.*?) bags contain (.*).$/;

const contentRegex = /(\d+) ([\w\s]+) bag/g;

// Parse each rule and store in bagRules
rules.forEach((rule) => {
  const [_, bag, contents] = rule.match(ruleRegex);
  const contentMap = new Map();

  let contentMatch;
  while ((contentMatch = contentRegex.exec(contents)) !== null) {
    const [_, count, bag] = contentMatch;
    contentMap.set(bag, parseInt(count));
  }

  bagRules.set(bag, contentMap);
});

// Function to check if a bag can eventually contain a shiny gold bag
function canContainShinyGold(bag) {
  const contents = bagRules.get(bag);
  if (contents.has("shiny gold")) {
    return true;
  }

  for (let [innerBag] of contents) {
    if (canContainShinyGold(innerBag)) {
      return true;
    }
  }
  return false;
}

// Count bags that can contain shiny gold
let count = 0;
bagRules.forEach((_, bag) => {
  if (bag !== "shiny gold" && canContainShinyGold(bag)) {
    count++;
  }
});

console.log(count);
