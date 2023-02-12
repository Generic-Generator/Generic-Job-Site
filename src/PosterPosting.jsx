import React, {useState} from 'react';
import Modal from './modal.js';
import Accordion from './accordion.js';
import axios from 'axios';

function PosterPosting({job, ind, poster, update}) {
  const [exp, setExp] = useState(job.experience)
  const [title, setTitle] = useState(job.title)
  const [description, setDescription] =  useState(job.description)
  const allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 .,?!'.split('')
  const interpretExp = (e) => {
    setExp(Number(e.target.value));
  }

  const typedTitle = (e) => {
    setTitle(e.target.value)
  }

  const typedDescription = (e) => {
    setDescription(e.target.value)
  }

  const [viewing, setviewing] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const [edit, setEdit] = useState(false);

  const deletePosting = () => {
    axios.delete(`/delete/${job.job}`)
    .then((res) => {
      update()
      doubleCheckDelete()
    })
    .catch((err) => {
      console.log('error deleting job posting')
    })
  }

  const doubleCheckDelete = () => {
    setCheckDelete(!checkDelete)
  }

  const startEdit = () => {
    setEdit(!edit)
  }

  const submitEdit = (e) => {
    e.preventDefault();
if((title.length > 0 && title.length <= 100) && (description.length > 0 && description.length <= 300) && exp > -1
    && title.split('').every((char) => {return allowed.indexOf(char) !== -1})
    && description.split('').every((char) => {return allowed.indexOf(char) !== -1})){
      axios.put('/edit', {job: job.job, title: title, description: description, exp: exp})
      .then((res) => {
        update()
        startEdit()
      })
      .catch((err) => {
        console.log('error updating posting');
      })
    }
    else {
      alert(`Description and title can only contain letters, numbers, spaces, and basic punctuation, and all 3 sections on the form must be filled to post a job. The tilte must be 100 characters or less and the description must be 300 or less characters. for referecnce approved characters are ${allowed}`)
    }
  }

  return (
    <div>
    <Accordion
        title={<h2 className="title">{job.title}</h2>}
        content={
        <div>
          <p>{`Description: ${job.description}`}</p>
          <p>{`Experience: ${job.experience} Years`}</p>
          <p>{`Applicants: ${job.applicants.length > 0 ? job.applicants : 'no applicants yet' }`}</p>
          <button onClick={startEdit} >Edit Posting</button>
          <button onClick={doubleCheckDelete} >Delete Posting</button>
          </div>}
        ind={ind}
      />

      {checkDelete && <Modal close={() => {doubleCheckDelete()}} content={
        <div>
          <h1>Are You Sure You Want To Delete This Posting?</h1>
          <button onClick={deletePosting}>Yes I'm Sure</button>
        </div>
      } />}
      {edit && <Modal close={() => {startEdit()}} content={
        <div>
          <form onSubmit={submitEdit}>
          <lable>Job Title</lable>
          <input type="text" defaultValue={job.title} onChange={typedTitle}></input>
          <span>{`${title.length}/100`}</span>
          <br/>
          <lable>Job Description</lable>
          <input type="text" defaultValue={job.description} onChange={typedDescription}></input>
          <span>{`${description.length}/300`}</span>
          <br/>
          <label className="xp-label">Required Years of Experience:</label>
          <select name="exp" onChange={interpretExp} defaultValue={job.experience}>
          <option value={-1}>Select</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <br/>
          <button type="submit" >Edit Posting</button>
        </form>
        </div>
      } />}
    </div>
  )
}

export default PosterPosting;