const moment = require('moment')
const _ = require('underscore')
const db = require('../dao/db')

async function listAll() {
  let [rows] = await db.query('SELECT id, title, category, post_time FROM article WHERE status = 1')
  return rows
}

async function groupByYear() {
  return _groupByYear(await listAll())
}

async function groupByCategory(category) {
  let [articles] = await db.query('SELECT id, title, category, post_time FROM article WHERE status = 1 AND category = ?', [category])
  return _groupByYear(articles)
}

async function getById(id) {
  let [articles] = await db.query('SELECT * FROM article WHERE id = ? AND status != -1', [id])
  return articles[0]
}

function _groupByYear(allArticles) {
  let sortedArticles = _.sortBy(allArticles, (article) => moment(article['post_time']).valueOf())

  let articleGroups = []
  let currentGroup = null
  for (let i = sortedArticles.length - 1; i >= 0; i--) {
    let article = sortedArticles[i]
    let postDateTime = moment(article['post_time'])
    article.postDate = postDateTime.format('YYYY-MM-DD')
    let year = moment(article['post_time']).year()
    if (!currentGroup || year !== currentGroup.year) {
      currentGroup = {year, articles: []}
      articleGroups.push(currentGroup)
    }
    currentGroup.articles.push(article)
  }

  return articleGroups
}

module.exports = {groupByYear, getById, groupByCategory}
