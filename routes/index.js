var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/iot', (req, res) => {
  res.render('button');
});

router.get('/switch', (req, res) => {
  client.publish('nodemcu/yash', req.query.action);
  res.end();
});

module.exports = router;
