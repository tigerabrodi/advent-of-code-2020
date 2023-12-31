# Advent of Code 2020

Very late lol.

# Learning notes

## UTF 8 encoding

When reading files with fs, you need to specify the encoding. Otherwise, you will get a buffer. You can convert the buffer to a string with `buffer.toString('utf-8')`. Or when reading the file, you can specify the encoding as a second argument.

# Report Repair

- Figure out if a number adds to number equals 2020 by subtracting 2020 from the number and checking if the result is in the Set.
- Set a label to the outer loop to break from inner loop all the way to outer loop
- If doing nested loop, outer loop should end earlier, not at length
