var express = require('express');
var router = express.Router();



var admin = require("firebase-admin");



var serviceAccount = require('../public/config.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-iot-dd310.firebaseio.com"
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/iot' , (req, res) => {
  res.render('buuton2')
})

router.get('/switch' , (req, res) => {
  console.log('I am Listening Here ....');
  admin.database().ref('/iot').update({
    "LEDStatus" : parseInt(req.query.action)
  });
  res.end();
})

module.exports = router;
