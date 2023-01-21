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
  pool.query('select id as job, title as title, descript as description, experience as experience from jobs', (err, data) => {
    if (err) {
      console.log('error retrieving runners from db: ', err);
    }
    res.send(data);
  })
});

app.get('/applied/:id', (req, res) => {
  const user = req.params.id;
  pool.query(`select Coalesce(((select json_agg(job) from applied where user_num = $1)), '[]'::json) as applied`, [user], (err, data) => {
    if (err) {
      console.log('error retrieving applied to:', err);
    }
    console.log(data.rows[0].applied)
    res.send(data)
  })
})

app.post('/user', (req, res) => {
  const {user} = req.body;
  pool.query('insert into users (user_num) values ($1) on conflict do nothing returning *', [user], (err, data) => {
    if (err) {
      console.log('error adding user', err)
    }
    res.send(`logged in`)
  })
})

app.post('/apply', (req, res) => {
  const {user, job} = req.body;
  pool.query('insert into applied (user_num, job) values ($1, $2) returning *', [user, job], (err, data) => {
    if (err) {
      console.log('error applying', err)
    }
    res.send('applied')
  })
})

app.delete('/clear/:id', (req, res) => {
  const user = req.params.id;
  pool.query('delete from applied where user_num = $1', [user], (err, data) => {
    if(err) {
      console.log('error unapplying', err)
    }
    res.send('unapplied all')
  })
})

app.listen(3004);
console.log('Listening on port 3004');