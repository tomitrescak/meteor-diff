# Introduction

Calculates and visualises differences between textual files. Uses teh popular [JSDifflib](https://github.com/cemerick/jsdifflib). Outputs either as HTML or plain text in Github style.

# Examples

To calculate deltas for two files:

```
var a = ' a\
b\
c'

var b = ' d\
b'

console.log(DiffViewSimple.compare(a, b));
```

outputs

```
- (1,) a
+ (,1) d
- (3,) c
```

To see the examples of the HTML output please see the original [documentation](https://github.com/cemerick/jsdifflib)

Use as:

```
DiffView.compare(a, b)
```



