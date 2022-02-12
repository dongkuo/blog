const config = require("config")
const moment = require('moment')
const _ = require('underscore')
const Database = require('better-sqlite3');

const db = new Database(config.db, {verbose: console.log});

function listAll() {
    return db.prepare('SELECT id, title, category, post_time FROM article').all()
}

function groupByYear() {
    return _groupByYear(listAll())
}

function groupByCategory(category) {
    let articles = db.prepare('SELECT id, title, category, post_time FROM article where category = ?').all(category)
    return _groupByYear(articles)
}

function getById(id) {
    return db.prepare('select * from article where id = ?').get(id)
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
