import React, {useState} from 'react';
import Modal from './modal.js';

function JobPosting({job, applied, addApplied, ind}) {

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
    <div className={`posting${(ind % 2 === 0) ? " even" : ""}`}>
          <h1 className="title">{`${job.Title}`}</h1>
          <button onClick={viewPost}>View Posting</button>
    </div>
    {applying && <Modal close={() => {viewPost()}} content={
      <div>
        <h1>{`${job.Title}`}</h1>
        <p>{job.Description}</p>
      <br/>
      <p>{`Experience: ${job.Experience} Years`}</p>
      <br/>
      <button onClick={applyNow}>Apply</button>
      </div>}
      />}
    </div>
  )
}

export default JobPosting;