var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var client = mqtt.connect('mqtt://try:try@broker.shiftr.io', { clientId: 'browser-client' });
client.on('connect', function(){
    console.log('client has connected!');
    client.subscribe('nodemcu/yash');
    client.subscribe('nodemcu/paras');
    client.on('message' , (message, topic) => {
      console.log("i AM RECEIVEING MESSAHGES" , message.toString(), topic.toString());
    })
});

router.get('/iot' , (req, res) => {
  res.render('button')
})

router.get('/switch' , (req, res) => {
  client.publish('nodemcu/yash' , req.query.action)
  res.end();
})



module.exports = router;
