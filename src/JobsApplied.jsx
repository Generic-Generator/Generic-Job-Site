import React, {useState} from 'react';
import Accordion from './accordion.js';
import axios from 'axios';

function JobsApplied({applied, user}) {

  const clearApplied = () => {
    axios.delete(`/clear/${user}`)
    .then((res) => {
      console.log('should be cleared, then add setapplied function')
    })
    .catch((err) => {
      console.log('error clearing applied history')
    })
  }

  return (
    <div>
      <br/>
      {applied.length > 0 && <h3>You Have Applied to These Jobs:</h3>}
    {applied.length > 0 && applied.map((job, i) => {
      return (<Accordion
        key={i}
        title={<h2 className="title">{job.title}</h2>}
        content={<div>{job.description} <br/> {`Experience: ${job.experience}`}</div>}
        ind={i}
      />)
    })}
    {applied.length > 0 && <div><button onClick={clearApplied} className='warning'>Warning: UnApply to All Jobs!!!</button></div>}
    {applied.length === 0 && <div>It Does Not Appear You Have Applied To Any Jobs This Session</div>}
    </div>
  )
}

export default JobsApplied;