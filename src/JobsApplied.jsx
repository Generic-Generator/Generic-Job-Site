import React, {useState} from 'react';
import Accordion from './accordion.js';
import axios from 'axios';

function JobsApplied({applied, user, clear}) {

  const clearApplied = () => {
    axios.delete(`/clear/${user}`)
    .then((res) => {
      clear()
    })
    .catch((err) => {
      console.log('error clearing applied history')
    })
  }

  return (
    <div className="overview">
      <br/>
      {applied.length > 0 && <h3>You Have Applied to These Jobs:</h3>}
    {applied.length > 0 && <div className="postings"> {applied.map((job, i) => {
      return (<Accordion
        data-testid='appliedpostings'
        key={i}
        title={<h2 className="title">{job.title}</h2>}
        content={<div>{job.description} <br/> {`Experience: ${job.experience}`}</div>}
        ind={i}
      />)
    })}
    </div>}
    {applied.length > 0 && <div><h2>Warning:  the button below will clear your applied to history</h2><button onClick={clearApplied} className='warning'>UnApply to All Jobs!!!</button></div>}
    {applied.length === 0 && <div data-testid='noappliedpostings'>You Are Not Applied To Any Jobs At The Moment</div>}
    </div>
  )
}

export default JobsApplied;