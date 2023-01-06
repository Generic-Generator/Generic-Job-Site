import React from 'react';

function Jobs({jobs, user}) {

  return (
    <div>
      <h1>{`Jobs for ${user}`}</h1>
      {jobs.map((job, i) => {return <div>{`Job ${i}`}</div>})}
    </div>
  )
}

export default Jobs;