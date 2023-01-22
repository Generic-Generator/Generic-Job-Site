import React, {useState} from 'react';
import Modal from './modal.js';
import axios from 'axios';

function JobPosting({job, applied, addApplied, ind, user}) {

  const [applying, setApplying] = useState(false);

  const viewPost = () => {
    setApplying(!applying)
  }

  const applyNow = () => {
    axios.post('/apply', {user: user, job: job.job})
    .then((res) => {
    addApplied()
    setApplying(!applying)
    })
    .catch((err) => {
      console.log('error applying')
    })
  }

  return (
    <div>
    <div className={`posting${(ind % 2 === 0) ? " even" : ""}`}>
          <h1 className="title">{`${job.title}`}</h1>
          <button onClick={viewPost}>View Posting</button>
    </div>
    {applying && <Modal close={() => {viewPost()}} content={
      <div>
        <h1>{`${job.title}`}</h1>
        <p>{job.description}</p>
      <br/>
      <p>{`Experience: ${job.experience} Years`}</p>
      <br/>
      <button onClick={applyNow}>Apply</button>
      </div>}
      />}
    </div>
  )
}

export default JobPosting;