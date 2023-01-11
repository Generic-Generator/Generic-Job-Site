import React, {useState} from 'react';

function JobsApplied({applied}) {

  return (
    <div>
    {applied.length > 0 && applied.map((job, i) => {
      return (<div key={i}>{`${job.Title}`}</div>)
    })}
    {applied.length === 0 && <div>It Does Not Appear You Have Applied To Any Jobs This Session</div>}
    </div>
  )
}

export default JobsApplied;