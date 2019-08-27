const express = require('express')
const app = express()
const port = 3000

var series = require('./router/series');
var users = require('./router/users');

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/serie', series);
app.use('/user', users);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));