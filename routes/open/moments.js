let express = require('express');
let router = express.Router();
let mongo = require('../../utils/mongo');

router.get('/', function (req, res) {
  mongo.getCollection('moments')
    .find({}, {sort: {date: -1}})
    .toArray()
    .then((moments) => {
      let data = [];
      let lastMoment;
      for (let moment of moments) {
        if (!lastMoment || !isGroup(lastMoment, moment)) {
          data.push([]);
        }
        data[data.length - 1].push(moment);
        lastMoment = moment;
      }
      res.render('open/moments', {page: 'moments', data: data, paddingZero: paddingZero});
    });
});

function isGroup(m1, m2) {
  return m1.date.getFullYear() === m2.date.getFullYear() && m1.date.getMonth() === m2.date.getMonth();
}

function paddingZero(num) {
  if (num <= 9) {
    return '0' + num;
  }
  return num + '';
}

module.exports = router;
