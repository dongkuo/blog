const axios = require('axios')
const fs = require('fs')

let data = fs.readFileSync('/home/derker/Documents/Blogs/2016-08-29-摊还分析.md', "utf-8")


axios.post('http://127.0.0.1:8080/posts', {
  title: '摊还分析',
  markdown: data
}).then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.log(error.data);
});