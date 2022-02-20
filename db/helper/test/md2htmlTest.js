const md2html = require('../md2html')
const fs = require('fs')

let data = fs.readFileSync('/Users/derker/Documents/博客/tidy/coding/2017-04-15-自己动手实现DNS协议.md', 'utf-8')

let output = md2html(data)

fs.writeFileSync('./md.html', output, "utf-8")