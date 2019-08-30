var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

var baseUrl = 'http://demo7835208.mockable.io/';

//Get all series from url
router.get('/', function (req, res) {
  //TODO
  //filter by category
  fetch(baseUrl + 'series', { method: 'get', headers: { 'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then(json => {
      return res.status(200).json(json)
    })
    .catch(err => {
      return res.status(500).json(err)
    }
  );
});

//Get series information and episodes
router.get('/:seriesId', function (req, res) {
  //TODO
  //read from service
  res.status(200).json({ msg: req.params })
});

//save episode as watched
//body: userId
router.post('/:seriesId/episode/:episodeId', function (req, res) {
  //TODO
  //connection to db
  res.status(200).json({ msg: req.params })
});

//delete episode as watched
//body: userId
router.delete('/:seriesId/episode/:episodeId', function (req, res) {
  //TODO
  //connection to db
  res.status(200).json({ msg: req.params })
});

module.exports = router