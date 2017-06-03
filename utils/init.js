#!/usr/bin/node

const USERNAME = '123456';
const PASSWORD = '123456';

const config = require('../config');
const mongo = require('./mongo');
mongo.init(config.mongo.host, config.mongo.port, config.mongo.db, () => {
  const crypto = require('crypto');
  const md5Password = crypto.createHash('md5').update(PASSWORD);
  mongo.getCollection('users').insertOne({'username': USERNAME, 'password': md5Password.digest('hex')}, (err, res) => {
    console.log(`init user: ${USERNAME}`);
    mongo.close();
  });
});
