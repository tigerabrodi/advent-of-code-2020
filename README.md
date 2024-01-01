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
