import React from 'react';

function JobPosting({job}) {

  return (
    <div>
          <h1>{`Job ${job}`}</h1>
          <button>apply</button>
    </div>
  )
}

export default JobPosting;