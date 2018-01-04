const axios = require('axios')
const fs = require('fs')

let data = fs.readFileSync('/home/derker/Documents/Blogs/2015-09-23-计数排序.md', "utf-8")


axios.post('http://127.0.0.1:9090/api/posts', {
  title: '斐波那契堆',
  markdown: data
}).then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.log(error.data);
});