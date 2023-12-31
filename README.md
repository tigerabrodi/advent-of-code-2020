# Advent of Code 2020

Very late lol.

# Learning notes

## UTF 8 encoding

When reading files with fs, you need to specify the encoding. Otherwise, you will get a buffer. You can convert the buffer to a string with `buffer.toString('utf-8')`. Or when reading the file, you can specify the encoding as a second argument.
