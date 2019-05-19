var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');

var client = mqtt.connect('mqtt://try:try@broker.shiftr.io', {
  clientId: 'browser-client'
});

client.on('connect', function() {
  client.subscribe('nodemcu/yash');
});

router.get('/make_dyno_onn', (req, res) => {
  res.json({ code: 'SUCCESS' });
});

router.get('/command/:device_id/:current_state', (req, res) => {
  console.log(req.params.device_id, req.params.current_state);
  let command = req.params.device_id + ',' + req.params.current_state;
  client.publish('nodemcu/yash', command);
  res.json({ code: 'SUCCESS' });
});

module.exports = router;
