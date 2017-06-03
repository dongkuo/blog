let mongo = {};
let MongoClient = require('mongodb').MongoClient;

mongo.init = function (host, port, db, callback) {
  let url = 'mongodb://' + host + ':' + port + '/' + db;
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.info('connected ' + url);
    mongo.db = db;
    if (callback instanceof Function) {
      callback(db);
    }
  });
};

mongo.getCollection = function (name) {
  return mongo.db.collection(name);
};

mongo.close = function () {
  mongo.db.close();
};

module.exports = mongo;
