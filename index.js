const express = require('express')
const app = express()
const port = 3000

var series = require('./router/series');

app.get('/', (req, res) => res.status(200).json({ 'msg': 'API OK' }));
app.use('/series', series);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));