# Robots in Mars
Node.js program that processes instructions via `stdin` and returns the robots status via `stdout`.

## Example
```sh
$ cat input.txt | node index.js
```

## Run tests
```sh
$ npm i && npm test
```

## Caveats
There are a couple of things that, after reading the documentation, were unclear to me:

1. It wasn't obvious how a instruction with a coordinate encoded like: `434` would be parsed: `(43,4)` or `(4,34)`. The former was implemented in the actual code. So `(4,3)` translates as `43`; `(43,4)` as `434`; `(4,34)` as `0434` and `(43,34)` as `4334`.
2. From the sample output, there was no line between the 2nd and the 3rd robot status: `33NLOST 23S`. I decided it was a typo and added en empty new line after every output.
3. In the event of lines with invalid coordinates, the program will throw and exit immediately. On the other hand, if a different instruction from the supported (F,L,R) is sent to the robot, the instruction is simply ignored.