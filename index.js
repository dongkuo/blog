const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require("morgan");
const rfs = require('rotating-file-stream');
const fs = require('fs');
const path = require('path');
const app = express();
const moment = require('moment');
const mongo = require('./utils/mongo');
const config = require('./config');

moment.locale(config.locale);
mongo.init(config.mongo.host, config.mongo.port, config.mongo.db);

app.set('view engine', 'ejs');

const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs((time, index) => {
  time = time || new Date();
  index = index || 0;
  return time.getFullYear() + '-' + pad(time.getMonth() + 1) + "-" + pad(time.getDate()) + '-' + index;

  function pad(num) {
    return (num > 9 ? "" : "0") + num;
  }
}, {size: '10M', path: logDirectory});

app.use(morgan(':remote-addr :date[iso] :referrer :method :url :status :res[content-length] :response-time', {stream: accessLogStream}));

app.use(session({
  secret: 'niceblog',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compression());
app.use("/public", express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

/*open页面*/
app.use('/', require('./routes/open/home'));
app.use('/archives', require('./routes/open/archives'));
app.use('/moments', require('./routes/open/moments'));
app.use('/about', require('./routes/open/about'));
app.use('/blog', require('./routes/open/blog'));
app.use('/login', require('./routes/open/login'));

/*manage页面*/
app.use('/manage/*', require('./routes/manage/intercept'));
app.use('/manage/articles', require('./routes/manage/articles'));
app.use('/manage/moments', require('./routes/manage/moments'));

/*api*/
app.use('/api/*', require('./routes/api/intercept'));
app.use('/api/session', require('./routes/api/session'));
app.use('/api/articles', require('./routes/api/articles'));
app.use('/api/moments', require('./routes/api/moments'));

app.use(function (err, req, res, next) {
  console.log(err);
  res.render('open/error', {title: 500, tip: 'Internal Server Error'});
});

app.listen(config.server.port, config.server.host, () => {
  console.log(`The server is run at ${config.server.host}:${config.server.port}`);
});
