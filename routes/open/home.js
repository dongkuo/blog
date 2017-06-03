let express = require('express');
let router = express.Router();
let mongo = require('../../utils/mongo');
let moment = require('moment');

router.get('/', function (req, res) {
  mongo.getCollection('articles')
    .find({}, {title: 1, summary: 1, date: 1}, {sort: {'date': -1}})
    .limit(20)
    .toArray()
    .then(articles => {
      res.render('open/home', {page: 'home', data: articles, moment: moment});
    });
});

module.exports = router;
