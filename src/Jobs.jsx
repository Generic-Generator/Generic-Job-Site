import React from 'react';
import JobPosting from './JobPosting.jsx';

function Jobs({jobs, user}) {

  return (
    <div>
      <h1>{`Jobs for ${user}`}</h1>
      {jobs.map((job, i) => {
        return (
        <JobPosting key={i} job={i + 1}/>
        )
        })}
    </div>
  )
}

export default Jobs;