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
  // password: process.env.PGPASSWORD // this was a hard typo to find in the terminal
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
      console.log('error retrieving jobs from db: ', err);
    }
    res.send(data);
  })
});
// `select Coalesce(((select json_agg(job) from applied where user_num = $1)), '[]'::json) as applied`
app.get('/applied/:id', (req, res) => {
  const user = req.params.id;
  pool.query('select id as job, title as title, descript as description, experience as experience from jobs where id in (select job from applied where user_num =$1)', [user], (err, data) => {
    if (err) {
      console.log('error retrieving applied to:', err);
    }
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

app.post('/poster', (req, res) => {
  const {poster} = req.body;
  pool.query('insert into posters (poster) values ($1) on conflict do nothing returning *', [poster], (err, data) => {
    if (err) {
      console.log('error adding poster', err)
    }
    res.send(`poster logged in`)
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

app.post('/postJob', (req, res) => {
  const {title, description, exp, poster} = req.body;
  pool.query('insert into jobs (title, descript, experience, poster) values ($1, $2, $3, $4) returning *', [title, description, exp, poster], (err, data) => {
    if(err) {
      console.log('error posting job', err)
    }
    res.send('posted job')
  })
})

app.get('/posted/:id', (req, res) => {
  const poster = req.params.id;
  pool.query("select id as job, title as title, descript as description, experience as experience, Coalesce(((select json_agg(user_num) from applied where job = id)), '[]'::json) as applicants from jobs where poster = $1", [poster], (err, data) => {
    if (err) {
      console.log('error retrieving posted jobs:', err);
    }
    res.send(data)
  })
})

app.delete('/delete/:job', (req, res) => {
  const job = req.params.job;
  pool.query('delete from jobs where id = $1', [job], (err, data) => {
    if(err){
      console.log('error deleting job posting', err)
    }
    res.send('deleted posting')
  })
})

app.put('/edit', (req, res) => {
  const {job, title, description, exp} = req.body;

  pool.query('update jobs set title = $2, descript = $3, experience = $4 where id = $1 returning *', [job, title, description, exp], (err, data) => {
    if(err) {
      console.log('error updating posting: ', err)
    }
    res.send('edited job posting')
  } )
})

app.listen(3007);
console.log('Listening on port 3007');