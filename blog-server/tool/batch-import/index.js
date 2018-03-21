#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const md2html = require('../md2html')
const Database = require('better-sqlite3')
const DEFAULT_ENCODING = 'utf-8'

/**
 * 程序入口
 */
function main() {

  const argv = require('yargs')
    .usage('Usage: $0 [options] <file>')
    // database
    .demandOption(['d'])
    .alias('d', 'database')
    .describe('d', 'the database file path')
    // encoding
    .default('e', DEFAULT_ENCODING)
    .alias('e', 'encoding')
    .describe('e', 'file encoding')
    .demandCommand(1)
    .help('h')
    .argv

  argv._.forEach(path => {
    importFileOrDir(path, argv.database, argv.encoding)
  })

}

let __db__ = null
let __statement__ = null

function getStatement(database, options) {
  if (!__db__) {
    __db__ = new Database(database, options)
  }
  if (!__statement__) {
    __statement__ = __db__.prepare('INSERT INTO tb_post (category_id, state, title, summary, html, markdown, finished_time, created_time, updated_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
  }
  return __statement__
}

/**
 * 导入单篇博客
 * @param file file path
 * @param database
 * @param encoding
 */
function importFile(file, database, encoding = DEFAULT_ENCODING) {

  let markdown = fs.readFileSync(file, {encoding: encoding})
  let html = md2html(markdown)
  let fileName = path.basename(file, path.extname(file))
  let finishedTime = fileName.substring(0, 10)
  let title = fileName.substring(11, fileName.length)

  let stmt = getStatement(database)
  stmt.run(1, 0, title, clearHtmlTag(html, 200), html, markdown, new Date(finishedTime).getTime(), new Date().getTime(), new Date().getTime())
  console.log(file + ' Done')
}

/**
 * 导入文件夹或文件
 * @param file dir path
 * @param database
 * @param encoding
 */
function importFileOrDir(file, database, encoding = DEFAULT_ENCODING) {

  let stat = fs.statSync(file)
  if (stat.isFile()) {
    // 是文件
    importFile(file, database, encoding)
  } else if (stat.isDirectory()) {
    // 是文件夹
    fs.readdirSync(file).forEach(name => {
      let fullPath = path.join(file, name)
      importFileOrDir(fullPath, database, encoding)
    })
  }

}

/**
 * 去除HTML标签
 * @param html
 * @param length
 */
function clearHtmlTag(html, length) {
  return html.replace(/<\/?.+?>/g, "").substring(0, length);
}

main()