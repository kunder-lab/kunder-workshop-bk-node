var express = require('express');
var mysql = require('mysql');
var fetch = require('node-fetch');
var router = express.Router();

var baseUrl = 'http://demo7835208.mockable.io/';
var con = mysql.createConnection({
    host: "35.202.30.254",
    user: "equipo",
    password: "+kunder+",
    database: "equipo2"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//Get all series from url
router.get('/', function (req, res) {
  console.log(req.query.type);
  //TODO
  //filter by category
  fetch(baseUrl + 'series', { method: 'get', headers: { 'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then(json => {
      var seriesFiltradas=[];
      if (req.query.type) {
        for (var serie of json.series) {
          if (serie.type===req.query.type) {
            console.log(serie);
            seriesFiltradas.push(serie);
          }
        }
        return res.status(200).json(seriesFiltradas);
      }
      else {
        return res.status(200).json(json.series);
      }
    })
    .catch(err => {
      return res.status(500).json(err)
    }
  );
});

//Get series information and episodes
router.get('/:seriesId', function (req, res) {
  fetch(baseUrl + 'series/'+ req.params.seriesId, { method: 'get', headers: { 'Content-Type': 'application/json'}})
      .then(resultado => {
        if (resultado.ok) {
          return resultado.json().then((json) => {
            return res.status(200).json(json.episodes);
          });
        }
        else {
          return res.status(resultado.status).json({message: resultado.statusText});
        }
      })
      .catch(err => {
            return res.status(500).json(err)
          }
      );
  //read from service
});

//save episode as watched
//body: userId
router.post('/:seriesId/episode/:episodeId', function (req, res) {
    var sqlSelect="select id from users_watched where user_id = 1 and serie_id =" + req.params.seriesId + " and episode_id =" + req.params.episodeId;
    con.query(sqlSelect, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        if (result.length ===0) {
            var sql = "insert into users_watched(user_id, serie_id, episode_id) values(1, " + req.params.seriesId + ", " + req.params.episodeId + ")";
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Result: " + result);
                res.status(201).json({ msg: "Acabas de ver este episodio eeee"})
            });
        }
        else {
            res.status(200).json({ msg: "Ya viste este VHS" })
        }
    });
  //TODO
  //connection to db

});

//delete episode as watched
//body: userId
router.delete('/:seriesId/episode/:episodeId', function (req, res) {
    var sqlSelect="select id from users_watched where user_id = 1 and serie_id =" + req.params.seriesId + " and episode_id =" + req.params.episodeId;
    con.query(sqlSelect, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        if (result.length ===1) {
            var sql = "delete from users_watched where id =" + result[0].id;
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Result: " + result);
                res.status(204).json();
            });
        }
        else {
            res.status(404).json({ msg: "Aún no has visto este episodio, no lo puedes borrar" })
        }
    });
  //connection to db
});

module.exports = router
