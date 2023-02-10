import React, {useState, useEffect} from 'react';
import Modal from './modal.js';
import Accordion from './accordion.js';
import axios from 'axios';
import PosterPosting from './PosterPosting.jsx';

function Poster({poster}) {
  const [addPosting, setAddPosting] = useState(false)
  const [exp, setExp] = useState(-1)
  const [title, setTitle] = useState('')
  const [description, setDescription] =  useState('')
  const allowed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 .,?!'.split('')
  const [postings, setPostings] = useState([])

  const getPostings = () => {
    axios.get(`/posted/${poster}`)
    .then((res) => {
      setPostings(res.data.rows)
    })
    .catch((err) => {
      console.log('error retrieving postings')
    })
  }

  useEffect(() => {
    getPostings()
  }, [])

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
      axios.post('/postJob', {title: title, description: description, exp: exp, poster: poster})
      .then((res) => {
        // console.log(res);
        getPostings()
        setAddPosting(false)
      })
      .catch((err) => {
        console.log('error posting job')
      })
      // console.log(`will post with title: ${title}, desc: ${description}, and exp: ${exp} by ${poster}`)// reminder to pass in poster id
      // setAddPosting(false)
    } else {
      alert(`Description and title can only contain letters, numbers, spaces, and basic punctuation, and all 3 sections on the form must be filled to post a job. for referecnce approved characters are ${allowed}`)
    }
  }

  return (
    <div>
    <h1>{`Welcome Poster ${poster}`}</h1>
    <h3>You can use the button below to create new job postings if you have less than 4</h3>
    {postings.length < 4 && <button onClick={createJob}>post a new job</button>}
    <h2>Created Jobs</h2>
    <h3>You can see who has applied to your postings and edit/delete the posting if you click the view posting button</h3>
    {postings.length > 0 && postings.map((job, i) => {
      return (<PosterPosting key={i} job={job} ind={i} poster={poster} update={() => {getPostings()}} />)
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