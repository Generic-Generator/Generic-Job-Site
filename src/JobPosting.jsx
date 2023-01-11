import React, {useState} from 'react';
import Modal from './modal.js';

function JobPosting({job, applied, addApplied}) {

  const [applying, setApplying] = useState(false);

  const viewPost = () => {
    setApplying(!applying)
  }

  const applyNow = () => {
    addApplied(job)
    setApplying(!applying)
  }

  return (
    <div>
    <div>
          <h1>{`${job.Title}`}</h1>
          <button onClick={viewPost}>View Posting</button>
    </div>
    {applying && <Modal close={() => {viewPost()}} content={
      <div>
        <h1>{`${job.Title}`}</h1>
        <p>{job.Description}</p>
      <br/>
      <button onClick={applyNow}>Apply</button>
      </div>}
      />}
    </div>
  )
}

export default JobPosting;