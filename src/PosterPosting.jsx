import React, {useState} from 'react';
import Modal from './modal.js';
import axios from 'axios';

function PosterPosting({job, ind, poster, update}) {

  const [viewing, setviewing] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);

  const viewPost = () => {
    setviewing(!viewing)
  }

  const deletePosting = () => {
    axios.delete(`/delete/${job.job}`)
    .then((res) => {
      update()
      doubleCheckDelete()
      viewPost()
    })
    .catch((err) => {
      console.log('error deleting job posting')
    })
  }

  const doubleCheckDelete = () => {
    setCheckDelete(!checkDelete)
  }

  return (
    <div>
    <div className={`posting${(ind % 2 === 0) ? " even" : ""}`}>
          <h1 className="title">{`${job.title}`}</h1>
          <button onClick={viewPost}>View Posting</button>
    </div>
    {viewing && <Modal close={() => {viewPost()}} content={
      <div>
        <h1>{`${job.title}`}</h1>
        <p>{job.description}</p>
      <br/>
      <p>{`Experience: ${job.experience} Years`}</p>
      <br/>
      <p>will put array of applied to here</p>
      <br/>
      <button >Edit Posting</button>
      <button onClick={doubleCheckDelete} >Delete Posting</button>
      </div>}
      />}
      {checkDelete && <Modal close={() => {doubleCheckDelete()}} content={
        <div>
          <h1>Are You Sure You Want To Delete This Posting?</h1>
          <button onClick={deletePosting}>Yes I'm Sure</button>
        </div>
      } />}
    </div>
  )
}

export default PosterPosting;