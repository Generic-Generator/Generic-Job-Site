import React, {useState} from 'react';
import Accordion from './accordion.js';

function JobsApplied({applied}) {

  return (
    <div>
      <br/>
      {applied.length > 0 && <h3>You Have Applied to These Jobs:</h3>}
    {applied.length > 0 && applied.map((job, i) => {
      return (<Accordion
        key={i}
        title={<h2 className="title">{job.Title}</h2>}
        content={<div>{job.Description} <br/> {`Experience: ${job.Experience}`}</div>}
        ind={i}
      />)
    })}
    {applied.length === 0 && <div>It Does Not Appear You Have Applied To Any Jobs This Session</div>}
    </div>
  )
}

export default JobsApplied;