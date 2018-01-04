const process = require('process')

const args = process.argv.splice(2)
const filePath = args[0]


const axios = require('axios')
const fs = require('fs')
const path = require('path')

const baseDir = "/home/derker/Documents/Blogs"

fs.readdirSync(baseDir).forEach(fileName => {
    if(!fileName.endsWith(".md")){
        return
    }
    const filePath = path.resolve(baseDir, fileName)
    let data = fs.readFileSync(filePath, "utf-8")
    axios.post('http://127.0.0.1:9090/api/posts', {
        title: getTitle(fileName),
        markdown: data,
        finished_time: getTime(fileName)
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error.data);
    });
});

function getTitle(fileName) {
    return fileName.substring(11, fileName.length - 3)
}

function getTime(fileName) {
    return new Date(fileName.substr(0, 10)).getTime() + parseInt(Math.random() * 86400000)
}