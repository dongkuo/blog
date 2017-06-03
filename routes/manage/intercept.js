let express = require('express');
let router = express.Router();

router.use('/', (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login?referer=' + req.originalUrl);
    return;
  }
  next();
});

module.exports = router;
