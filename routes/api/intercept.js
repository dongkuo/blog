let express = require('express');
let router = express.Router();
const EXCLUDE = {
  '/api/session': true
};

router.use('/', function (req, res, next) {
  if (!req.session.user && !EXCLUDE[req.baseUrl]) {
    res.json({code: 1, message: '请先登录', data: ''});
    return;
  }
  next();
});

module.exports = router;
