let express = require('express');
let router = express.Router();
let mongo = require('../../utils/mongo');
let moment = require('moment');

router.get('/', function (req, res) {
  mongo.getCollection('articles')
    .find({}, {sort: {'date': -1}})
    .toArray()
    .then(articles => {
      let data = [];
      let lastYear = -1;
      for (let article of articles) {
        if (article.date.getFullYear() !== lastYear) {
          data.push([]);
          lastYear = article.date.getFullYear();
        }
        data[data.length - 1].push(article);
      }
      res.render('open/archives', {page: 'archives', data: data, moment: moment});
    });
});

module.exports = router;
