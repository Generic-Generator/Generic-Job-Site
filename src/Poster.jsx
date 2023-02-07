import React, {useState, useEffect} from 'react';
import Modal from './modal.js';
import Accordion from './accordion.js';

function Poster({poster}) {
  const [addPosting, setAddPosting] = useState(false)
  const [exp, setExp] = useState(-1);

  const createJob = () => {
    setAddPosting(!addPosting)
  }
  const interpretExp = (e) => {
    // if (e.target.value > -1){
    //   setSearchingXp(true)
    // } else {
    //   setSearchingXp(false)
    // }
    setExp(Number(e.target.value));
  }

  const submitJob = (e) => {
    e.preventDefault();

    console.log('form submit without refresh', exp)

    e.currentTarget.reset();// redundant when the modal will close and clear the form anyways
  }

  return (
    <div>
    <h1>{`Welcome Poster ${poster}`}</h1>
    <button onClick={createJob}>post a new job</button>
    <h2>Created Jobs</h2>
    {[11,12,13,14].map((x,y,z) => {
      return (<div>{z[y]}</div>)
    })}
    {addPosting && <Modal close={createJob} content={
      <div>
        <form onSubmit={submitJob}>
          <lable>Job Title</lable>
          <input type="text" placeholder="Software Engineer"></input>
          <br/>
          <lable>Job Description</lable>
          <input type="text" placeholder="list the tech stack"></input>
          <br/>
          <label className="xp-label">Required Years of Experience:</label>
          <select name="exp" onChange={interpretExp}>
          <option value={-1}>Select</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <br/>
          <button type="submit" >Post Job</button>
        </form>
      </div>
    }/>}
    </div>
  )
}

export default Poster;