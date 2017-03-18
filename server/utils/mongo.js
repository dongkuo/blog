const Mongo = {};
const DEFAULT_CONFIG = {
  host: "localhost",
  port: 27017,
  db: "niceblog"
};

Mongo.init = function (config, callback) {
  merge(DEFAULT_CONFIG, config);
  require('mongodb').MongoClient.connect(`mongodb://${config.host}:${config.port}/${config.db}`, function (err, db) {
    Mongo.__db__ = db;
    console.log(`connect db ${db} success`);
    if (callback instanceof Function) {
      callback();
    }
  });
};

Mongo.close = function () {
  if (Mongo.__db__) {
    Mongo.__db__.close();
  }
};

Mongo.getCollection = function (name) {
  Mongo.__collections__ = Mongo.__collections__ || {};
  Mongo.__collections__[name] = Mongo.__collections__[name] || Mongo.__db__.collection(name);
  return Mongo.__collections__[name];
};

function merge(src, dest) {
  if (!dest) {
    return src;
  }
  for (let item in src) {
    if (src.hasOwnProperty(item) && dest[item] === undefined) {
      dest[item] = src[item]
    }
  }
}

module.exports = Mongo;
