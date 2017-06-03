let express = require('express');
let mongo = require('../../utils/mongo');
let ObjectId = require('mongodb').ObjectId;
let moment = require('moment');
let router = express.Router();

router.get('/:id', function (req, res) {
  let id = req.params.id;
  try {
    id = ObjectId(id);
  } catch (e) {
    res.render('tip', {title: 404, tip: 'Not Found'});
    return;
  }
  mongo.getCollection('articles')
    .findOne({_id: id}, (err, r) => {
      if (err) throw err;
      res.render('open/blog', {title: r.title + ' - 梵高先生', page: '', data: r, moment: moment});
    });
});

module.exports = router;
