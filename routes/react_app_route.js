var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var firebase = require('firebase');
var fire_base_app = firebase.initializeApp(require('../config'));
var rootRef = fire_base_app.database().ref();

var client = mqtt.connect('mqtt://try:try@broker.shiftr.io', {
  clientId: 'browser-client'
});

client.on('connect', function() {
  client.subscribe('nodemcu/yash');
});

client.on('message', async (message, topic) => {
  if (topic.toString() === 'initial_request') {
    var device_ids = [];
    var big_object = {};
    var publish_response = '';
    console.log('Publishing Initial State Of Devices');
    let devicesRef = await rootRef.child('devices');
    await devicesRef.once('value', snapshots => {
      snapshots.forEach(item => {
        device_ids = Object.keys(item.val());
        big_object = item.val();
      });
    });

    device_ids.forEach(item => {
      publish_response += item + ',' + big_object[item]['status'] + ':';
    });
    publish_response = publish_response.substring(
      0,
      publish_response.length - 1
    );
    console.log(publish_response);
    client.publish('nodemcu/yash', publish_response);
  }
});

router.get('/make_dyno_onn', (req, res) => {
  res.json({ code: 'SUCCESS' });
});

router.get('/command/:device_id/:current_state', (req, res) => {
  let command = req.params.device_id + ',' + req.params.current_state;
  client.publish('nodemcu/yash', command);
  res.json({ code: 'SUCCESS' });
});

module.exports = router;
