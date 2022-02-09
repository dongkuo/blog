const md2html = require('../md2html')
const fs = require('fs')

let data = fs.readFileSync('./test.md', 'utf-8')

let html = md2html(data)
console.log(html)