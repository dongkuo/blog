let express = require('express');
let router = express.Router();
let ObjectId = require('mongodb').ObjectId;
let mongo = require('../../utils/mongo');

/**
 * 创建moment
 */
router.post('/', function (req, res) {
  let moment = {};
  moment.date = new Date(req.body.date);
  moment.content = req.body.content.substr(0, 200);
  mongo.getCollection('moments')
    .insertOne(moment, (err, r) => {
      if (err) {
        console.err(err);
        res.status(500).end();
        return;
      }
      res.json({
        code: 0, message: '', data: r.ops[0]
      })
    });
});

/**
 * 删除moment
 */
router.delete('/:id', function (req, res) {
  mongo.getCollection('moments').deleteOne({_id: ObjectId(req.params.id)}, (err, r) => {
    if (err) {
      console.err(err);
      res.status(500).end();
      return;
    }
    res.json({code: 0, message: '', data: r})
  });
});


/**
 * 更新moment
 */
router.put('/:id', (req, res) => {
  let moment = {};
  moment.date = new Date(req.body.date);
  moment.content = req.body.content.substr(0, 200);
  mongo.getCollection('moments').updateOne({_id: ObjectId(req.params.id)}, {$set: moment}, (err, r) => {
    if (err) {
      console.err(err);
      res.status(500).end();
      return;
    }
    res.json({code: 0, message: '', data: r})
  });
});

module.exports = router;
