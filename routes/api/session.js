let express = require('express');
let router = express.Router();
let mongo = require('../../utils/mongo');
let crypto = require('crypto');

router.post('/', function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({code: 1, message: '用户名或密码有误', data: ''});
    return;
  }
  let md5 = crypto.createHash('md5');
  md5.update(req.body.password);
  let password = md5.digest('hex');
  mongo.getCollection('users')
    .findOne({username: req.body.username, password: password}, {password: 0}, (err, r) => {
      if (!r) {
        res.json({code: 1, message: '用户名或密码有误', data: ''});
        return;
      }
      req.session.user = r;
      res.json({code: 0, message: '', data: r});
    });
});

module.exports = router;
