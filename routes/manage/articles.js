let express = require('express');
let router = express.Router();
let mongo = require('../../utils/mongo');
let moment = require('moment');

router.get('/', function (req, res) {
  mongo.getCollection('articles')
    .find({}, {title: 1, date: 1}, {sort: {'date': -1}})
    .toArray()
    .then(articles => {
      res.render('manage/articles', {page: 'articles', data: articles, moment: moment});
    });
});

/**
 * 编辑文章
 */
router.get('/edit', (req, res) => {
  res.render('manage/article_editor', {title: req.query.id ? '修改文章' : '新建文章', id: req.query.id});
});

module.exports = router;
