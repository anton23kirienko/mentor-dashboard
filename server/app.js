const fs = require('fs');
const express = require('express');
const parseFiles = require('./src/parser');

const app = express();

const PORT = process.env.PORT || 5000; //https://shielded-wildwood-44956.herokuapp.com/data.json

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get('/data.json', (req, res) => {

  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) return console.log(`Can't read data.json /n ${err}`);
    res.send(data);
  });
});

app.listen(PORT, () => console.log(`listening on ${ PORT }`));
