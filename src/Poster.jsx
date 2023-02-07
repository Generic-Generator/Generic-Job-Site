import React, {useState, useEffect} from 'react';
import Modal from './modal.js';
import Accordion from './accordion.js';

function Poster({poster}) {
  const [addPosting, setAddPosting] = useState(false)
  const [exp, setExp] = useState(-1)
  const [title, setTitle] = useState('')
  const [description, setDescription] =  useState('')
  const allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,'.split('')
  const [postings, setPostings] = useState([])

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

  const typedTitle = (e) => {
    setTitle(e.target.value)
  }

  const typedDescription = (e) => {
    setDescription(e.target.value)
  }

  const submitJob = (e) => {
    e.preventDefault();

    if((title.length > 0 && title.length <= 100) && (description.length > 0 && description.length <= 300) && exp > -1
    && title.split('').every((char) => {return allowed.indexOf(char) !== -1})
    && description.split('').every((char) => {return allowed.indexOf(char) !== -1})) {
      console.log(`will post with title: ${title}, desc: ${description}, and exp: ${exp}`)
      setAddPosting(false)
    } else {
      alert(`Description and title can only contain letters, spaces, periods and commas, and all 3 sections on the form must be filled to post a job. for referecnce approved characters are ${allowed}`)
    }
  }

  return (
    <div>
    <h1>{`Welcome Poster ${poster}`}</h1>
    <button onClick={createJob}>post a new job</button>
    <h2>Created Jobs</h2>
    {postings.length > 0 && postings.map((x,y,z) => {
      return (<div>{z[y]}</div>)
    })}
    {postings.length === 0 && <div>There are no job postings active for your company</div>}
    {addPosting && <Modal close={createJob} content={
      <div>
        <form onSubmit={submitJob}>
          <lable>Job Title</lable>
          <input type="text" placeholder="Software Engineer" onChange={typedTitle}></input>
          <br/>
          <lable>Job Description</lable>
          <input type="text" placeholder="list the tech stack" onChange={typedDescription}></input>
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