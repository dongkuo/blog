const md2html = require('../md2html')
const fs = require('fs')

let data = fs.readFileSync('/Users/derker/Documents/博客/2016-10-15-斐波那契堆.md', 'utf-8')

let output = md2html(data)

fs.writeFileSync('./md.html', output, "utf-8")