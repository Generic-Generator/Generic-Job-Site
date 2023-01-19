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

// mongoose.connect()

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3004);
console.log('Listening on port 3004');