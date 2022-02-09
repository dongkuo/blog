const md2html = require('../md2html')
const fs = require('fs')

let data = fs.readFileSync('./test.md', 'utf-8')

let output = md2html(data)

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
fs.writeFileSync('./md.html', output, "utf-8")