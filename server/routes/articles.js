const express = require('express');
const router = express.Router();
const mongo = require('../utils/mongo');
const ObjectId = require('mongodb').ObjectId;

/**
 * 获取文章归档
 */
router.get('/archives', (req, res) => {
  mongo.getCollection('article').find({}, {title: 1, date: 1}).sort({date: -1}).toArray()
    .then((articles) => {
      res.json(articles);
    }).catch((err) => {
    res.status(500).send(err.message);
  });
});

/**
 * 获取文章摘要
 */
router.get('/summaries', (req, res) => {
  let skip = parseInt(req.query.skip) || 0;
  let limit = parseInt(req.query.limit) || 20;
  let sort = req.query.sort || {date: -1};
  limit = limit > 60 ? 60 : limit;
  mongo.getCollection('article').count().then(total =>{
    mongo.getCollection('article').find({}, {
      title: 1,
      date: 1,
      summary: 1,
      word: 1,
      like: 1,
      view: 1,
      labels: 1
    }).skip(skip)
      .limit(limit)
      .sort(sort)
      .toArray()
      .then((articles) => {
        res.json({skip: skip, limit: limit, sort: sort, total: total, data: articles});
      }).catch(err => res.status(500).send(err.message));
  }).catch(err => res.status(500).send(err.message));
});

/**
 * 获取某篇文章详情
 */
router.get('/:id', (req, res) => {
  let id = req.params.id;
  mongo.getCollection('article').findOne({'_id': ObjectId.createFromHexString(id)})
    .then((article) => {
      res.json(article);
    }).catch(err => {
    res.status(500).send(err.message);
  });
});

module.exports = router;
