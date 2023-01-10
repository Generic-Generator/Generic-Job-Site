import React, {useState} from 'react';

function JobsApplied({applied}) {

  return (
    <div>
    {applied.length > 0 && <div>{`${applied.length} jobs applied to`}</div>}
    {applied.length === 0 && <div>It Does Not Appear You Have Applied To Any Jobs This Session</div>}
    </div>
  )
}

export default JobsApplied;