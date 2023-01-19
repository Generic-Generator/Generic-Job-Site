const express = require('express');
const compression = require('compression')
const app = express();
const path = require('path');
require('dotenv').config();
// const mongoose = require('mongoose');
// const Job = require('../database/jobs.js')

const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(compression());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/1', (req, res) => {
  res.send('hitting server')
})

app.get('/jobs', (req, res) => {
  pool.query('select id as Job, title as Title, descript as Description, experience as Experience from jobs', (err, data) => {
    if (err) {
      console.log('error retrieving runners from db: ', err);
      throw err;
    }
    res.send(data.rows);
  })
});

app.listen(3004);
console.log('Listening on port 3004');