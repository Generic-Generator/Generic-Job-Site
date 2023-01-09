import React, {useState} from 'react';
import Modal from './modal.js';

function JobPosting({job}) {

  const [applying, setApplying] = useState(false);

  const applyNow = () => {
    setApplying(!applying)
  }

  return (
    <div>
    {!applying && <div>
          <h1>{`Job ${job}`}</h1>
          <button onClick={applyNow}>apply</button>
    </div>}
    {applying && <Modal close={() => {applyNow()}} content={`display Job ${job} Information`}/>}
    </div>
  )
}

export default JobPosting;