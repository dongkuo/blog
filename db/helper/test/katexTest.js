const katex = require('katex')
const fs = require('fs')

let expr = fs.readFileSync('./test.tex', 'utf-8')

console.log(katex.renderToString(expr.trim()))