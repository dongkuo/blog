const katex = require('katex')
const fs = require('fs')

let expr = fs.readFileSync('./test.tex', 'utf-8')

let output = katex.renderToString(expr.trim())

output = `
<!doctype html>
<html lang="zh">
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css">
</head>
<body>
${output}
</body>
</html>
`
fs.writeFileSync('./katex.html', output, "utf-8")