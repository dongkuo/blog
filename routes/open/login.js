let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
  res.render('open/login', {page: ''});
});

module.exports = router;
