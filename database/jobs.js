const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  Job: {
    type: Number,
    required: true,
    unique: true
  },
  Description: {
    type: String,
    required: true
  },
  Experience: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  Title: {
    type: String,
    required: true
  }

});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;