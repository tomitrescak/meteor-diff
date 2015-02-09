# Introduction

Calculates and visualises differences between textual files. Uses teh popular [JSDifflib](https://github.com/cemerick/jsdifflib). Outputs either as HTML or plain text in Github style.

# Examples

To calculate **deltas** for two files:

```
var a = ' a\
b\
c'

var b = ' d\
b'
```

## HTML output

```
DiffView.compare(a, b)
```

for **side by side** configuration outputs:

|   | Old text |   | New text |
| ---- | -------- | ---- | -------- |
| 1 | a        | 1 | d        |
| 2 | b        | 2 | b        |
| 3 | c        |   |          |

and for the **inline** configuration outputs

|   |   | Text |
| ---- | ---- | -------- |
| 1 |   | a       |
|   | 1 | d       |
| 2 | 2 | b       |
| 3 |   | c

## Textual output

```
console.log(DiffViewSimple.compare(a, b));
```

outputs

```
- (1,) a
+ (,1) d
- (3,) c
```

To see the more examples and options please see the original [documentation](https://github.com/cemerick/jsdifflib)




