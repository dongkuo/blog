let express = require('express');
let router = express.Router();
let mongo = require('../../utils/mongo');
let ObjectId = require('mongodb').ObjectId;
let moment = require('moment');

router.get('/', function (req, res) {
  mongo.getCollection('moments')
    .find({}, {content: 1, date: 1}, {sort: {'date': -1}})
    .toArray()
    .then(moments => {
      res.render('manage/moments', {page: 'moments', data: moments, moment: moment});
    });
});


router.get('/edit', function (req, res) {
  if (!req.query.id){
    res.render('manage/moments_editor', {page: '', data: {}, action: '保存', id: ''});
    return;
  }
  mongo.getCollection('moments').findOne({_id: ObjectId(req.query.id)}, (err, r) => {
    res.render('manage/moments_editor', {page: '', data: r || {}, action:'修改', id: req.query.id});
  });
});

module.exports = router;
