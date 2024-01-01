# Advent of Code 2020

Very late lol.

# Learning notes

## UTF 8 encoding

When reading files with fs, you need to specify the encoding. Otherwise, you will get a buffer. You can convert the buffer to a string with `buffer.toString('utf-8')`. Or when reading the file, you can specify the encoding as a second argument.

# Report Repair

- Figure out if a number adds to number equals 2020 by subtracting 2020 from the number and checking if the result is in the Set.
- Set a label to the outer loop to break from inner loop all the way to outer loop
- If doing nested loop, outer loop should end earlier, not at length

# Password Philosophy

- Remember to use regex groups to get the values you want

# Thought process for writing efficient code

1. **Identify Bottlenecks**: Look for operations that are repeated many times, especially within loops. These are often the first places to optimize.

2. **Choose the Right Data Structures**: Using the right data structure for the task can significantly improve performance. For example, sets and hash tables are great for quick lookups and uniqueness checks.

3. **Avoid Unnecessary Operations**: Reduce the number of operations, such as string splits or regex matches, especially inside loops.

4. **Leverage Built-in Methods**: Often, built-in methods are optimized for performance. Use them wisely to reduce the complexity of your code.

5. **Think Big O Notation**: Understand the time complexity of your operations. Aim for linear (O(n)) or logarithmic (O(log n)) time complexity where possible, especially for large datasets.

# Regex

The regex pattern `\b\w+(?=:)/g` explained:

1. **`\b`**: This is a word boundary. It ensures that the pattern matches only at the beginning of a word. This prevents the regex from matching a substring that happens to fit the pattern but isn't actually at the start of a word.

2. **`\w+`**:

   - `\w` matches any word character (equivalent to `[a-zA-Z0-9_]`). This includes all letters (both uppercase and lowercase), digits, and the underscore character.
   - The `+` is a quantifier that matches one or more of the preceding element. So, `\w+` matches one or more word characters in a sequence.

   In your case, it matches the field names in the passport data, like `byr`, `iyr`, `eyr`, etc.

3. **`(?=:)`**: This is a positive lookahead. A lookahead is a type of zero-width assertion in regular expressions that matches a group after your main expression without including it in the result.

   - `(?=:)` asserts that the following character must be a colon `:` but does not include the colon in the match.
   - This is used to ensure that the regex only matches a sequence of word characters that are immediately followed by a colon, as is the format of the key-value pairs in your passport data (like `byr:1970`).

4. **`/g`**: This is the global flag. It tells the regex engine to find all matches within a given string, rather than stopping at the first match.

So, when applied to a string like `ecl:gry pid:860033327`, this regex will match `ecl` and `pid` but not `gry` or `860033327`. It looks for sequences of word characters that are directly followed by a colon, which is exactly what you want when trying to identify the keys in each passport's data.

## Positive Lookahead

The positive lookahead is denoted by (?=...), where ... is the pattern that you expect to find immediately following the main pattern, but you don't want to include it in your match.

## \b

The `\b` in a regular expression is known as a word boundary. It's a special kind of pattern that helps to match positions in a string where a word starts or ends. Here's a breakdown of how `\b` works:

1. **Word Boundary (`\b`)**:

   - **Definition**: A word boundary represents the position between a word character and a non-word character. The word characters are typically defined by `\w`, which includes letters (both uppercase and lowercase), digits (`0-9`), and the underscore (`_`). Non-word characters are everything else, like spaces, punctuation, etc.
   - **Function**: `\b` doesn't match a character but a position. It matches the position where a word character is next to a non-word character.

2. **Examples**:

   - In the string `"Hello World!"`, there are word boundaries at the beginning of `"Hello"`, at the end of `"Hello"`, at the beginning of `"World"`, and at the end of `"World"`.
   - The regex `\bHello\b` would match `"Hello"` in `"Hello World!"`, but it wouldn't match `"Hello"` in `"HelloWorld"` or `"OHello"` because in these cases, `"Hello"` isn't surrounded by word boundaries.

3. **Usage in Your Regex**:
   - In your regex `\b\w+(?=:)`, the `\b` at the beginning ensures that the match starts at the beginning of a word. This is important for correctly identifying the keys in your passport data. It prevents the regex from matching a substring of a larger word. For instance, without `\b`, a pattern like `\w+(?=:)` might incorrectly match just `yr` in `byr:1990`, while with `\b`, it correctly identifies the whole `byr`.

In summary, `\b` is used in regular expressions to ensure that the pattern matches complete words, as defined by the boundaries between word characters and non-word characters. This is particularly useful in cases where you need to isolate whole words or symbols, like keys in key-value pairs.

## `/\b\w+(?=):(\S+)/g`

### Breakdown of the Regular Expression

1. **`(\b\w+(?=:))`**:

   - `\b` is a word boundary, ensuring the match starts at the beginning of a word.
   - `\w+` matches one or more word characters (letters, digits, and underscores).
   - `(?=:)` is a positive lookahead that asserts what follows is a colon `:` but doesn't include it in the match.
   - The entire group `(\b\w+(?=:))` is a capturing group that will capture the key part of a key-value pair (like `byr` in `byr:1990`). This group will match a word at the boundary that is immediately followed by a colon.

2. **`:(\S+)`**:

   - `:` matches the colon literally.
   - `\S+` matches one or more non-whitespace characters. This is a broader category than `\w` as it includes any character that is not a space, tab, newline, etc. It's useful for capturing the values in the key-value pairs, as these values can include a wider range of characters (like `#` in color codes, numbers, or units in measurements).
   - The group `(\S+)` is another capturing group that captures the value part of a key-value pair.

3. **`/g`**:
   - This is the global flag that allows the pattern to match all occurrences in the string, not just the first one.

### `\w+` vs. `\S+`

- **`\w+`**: Matches word characters (letters, digits, and underscores). It's limited to alphanumeric characters and underscores.
- **`\S+`**: Matches any non-whitespace character. It includes a much broader set of characters compared to `\w+`, such as punctuation marks, symbols, and any other characters that are not spaces, tabs, or newline characters.

### Application in Your Regex

In the context of your regex, `/\b\w+(?=):(\S+)/g` is designed to capture both the key and the value in each key-value pair of your passport data. The key is expected to be a word (`\w+`), and the value can be a wider range of characters (`\S+`), which is why different patterns are used for each.

# Day 7

Regular expressions (regex) are used here to extract the necessary information from each rule.

1. **Rule Regex (`ruleRegex`)**: `^(.*?) bags contain (.*).$`

   - `^`: Asserts the start of the string.
   - `(.*?)`: A non-greedy match for any characters. This captures the bag color (e.g., "light red").
   - `bags contain`: Literal text separating the bag color from its contents.
   - `(.*).`: Matches everything after "bags contain" until the end of the string, capturing the contents of the bag (e.g., "1 bright white bag, 2 muted yellow bags").
   - `$`: Asserts the end of the string.

2. **Content Regex (`contentRegex`)**: `(\d+) ([\w\s]+) bag`
   - `(\d+)`: Captures the quantity of each contained bag (e.g., "1").
   - `([\w\s]+)`: Captures the color of the contained bag. This is a combination of word characters (`\w`) and spaces (`\s`), which together match bag colors like "bright white".
   - `bag`: Literal text marking the end of each bag description.

## While loop with reassignment trick

The loop `while ((contentMatch = contentRegex.exec(contents)) !== null) { ... }` is a common idiom in JavaScript for working with regular expressions, particularly when using a regex with the global (`g`) flag.

### The `exec` Method

- `exec` is a method of regular expression objects that executes a search for a match in a specified string.
- When a regex has the global flag (`g`), `exec` behaves differently: each call to `exec` continues the search from where the last match ended. This allows you to find all matches in a string.

### The Loop

- `while ((contentMatch = contentRegex.exec(contents)) !== null) { ... }`
  - `contentRegex.exec(contents)`: This tries to find the next match in the string `contents`.
  - `contentMatch = contentRegex.exec(contents)`: The result of the `exec` call (the match object or `null` if no more matches are found) is assigned to `contentMatch`.
  - The extra parentheses around `contentMatch = contentRegex.exec(contents)` ensure that the assignment is evaluated first, and then its result (the value of `contentMatch`) is compared to `null`.
  - `!== null`: If a match is found, `exec` returns a match object (which is truthy), otherwise, it returns `null`. The loop continues as long as there are matches found in the string.
