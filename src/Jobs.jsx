import React, {useState} from 'react';
import JobPosting from './JobPosting.jsx';
import JobsApplied from './JobsApplied.jsx';

function Jobs({jobs, user}) {
  const [appliedFor, setAppliedFor] = useState([])
  const [showApplied, setShowApplied] = useState(false);

  const displayApplied = () => {
    setShowApplied(!showApplied)
  }

  return (
    <div>
      {!showApplied && <h1>{`Jobs for ${user}`}</h1>}
      {showApplied && <h1>{`Jobs user ${user} Applied for`}</h1>}
      {!showApplied && <button onClick={displayApplied}>view Jobs Applied to</button>}
      {showApplied && <button onClick={displayApplied}>view Job Openings</button>}
      {showApplied && <JobsApplied applied={appliedFor}/>}
      {!showApplied && jobs.map((job, i) => {
        return (
        <JobPosting key={i} job={i + 1} applied={appliedFor} addApplied={(job) => {setAppliedFor(appliedFor.concat([job]))}} />
        )
        })}
    </div>
  )
}

export default Jobs;