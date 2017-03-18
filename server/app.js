const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongo = require('./utils/mongo');
const morgan = require("morgan");
const rfs = require('rotating-file-stream');
const articles = require('./routes/articles');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// 日志
function generator(time, index) {
  time = time || new Date();
  index = index || 0;
  return time.getFullYear() + '-' + pad(time.getMonth() + 1) + "-" + pad(time.getDate()) + '-' + index;

  function pad(num) {
    return (num > 9 ? "" : "0") + num;
  }
}
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs(generator, {size: '10M', path: logDirectory});
app.use(morgan(':remote-addr :date[iso] :referrer :method :url :status :res[content-length] :response-time', {stream: accessLogStream}));
app.use(express.static('public'));
app.use('/api/articles', articles);

// 处理404错误
app.use(function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// 处理全局错误
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err.message);
});

const config = require('./config.json');

mongo.init({host: config.mongodb.host, port: config.mongodb.port, db: config.mongodb.db});

const server = app.listen(config.server.port || 3000, config.server.host || '0.0.0.0', () => {
  let host = server.address().address;
  const port = server.address().port;
  console.log('The server listening at http://%s:%s', host, port);
});
