var express = require('express')
var router = express.Router()


//Save user
router.post('/', function (req, res) {
  res.status(200).json({ msg: 'ok' })
});

//Get users
router.get('/', function (req, res) {
  res.status(200).json({ msg: 'ok' })
});

module.exports = router