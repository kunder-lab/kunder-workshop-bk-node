var express = require('express')
var router = express.Router()


//Get all series
router.get('/', function (req, res) {
  res.status(200).json({ msg: 'ok' })
});

//Get serie information and episodes
router.get('/:serieId', function (req, res) {
  res.status(200).json({ msg: req.params })
});

//Save series as liked
router.post('/:serieId', function (req, res) {
  res.status(200).json({ msg: req.params })
});

//Save episode as seen
router.post('/:serieId/episode/:episodeId', function (req, res) {
  res.status(200).json({ msg: req.params })
});

module.exports = router