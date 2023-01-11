import React, {useState} from 'react';
import JobPosting from './JobPosting.jsx';
import JobsApplied from './JobsApplied.jsx';

function Jobs({jobs, user}) {
  const [appliedFor, setAppliedFor] = useState([])
  const [showApplied, setShowApplied] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState('');
  const [filtered, setfiltered] = useState([]);

  const displayApplied = () => {
    setShowApplied(!showApplied)
  }

  return (
    <div>
      {!showApplied && <h1>{`Jobs for ${user}`}</h1>}
      {showApplied && <h1>{`Jobs user ${user} Applied for`}</h1>}
      {!showApplied && <button onClick={displayApplied}>view Jobs Applied to</button>}
      {showApplied && <button onClick={displayApplied}>view Job Openings</button>}
      {!showApplied &&
      <div>
        <br/>
        <input type='text' placeholder='Search for Jobs'></input>
        </div>}
      {showApplied && <JobsApplied applied={appliedFor}/>}
      {!showApplied && !searching && jobs.map((job, i) => {
        return (
        <JobPosting key={i} job={job} applied={appliedFor} addApplied={(job) => {setAppliedFor(appliedFor.concat([job]))}} />
        )
        })}
        {!showApplied && searching && filtered.length > 0 && filtered.map((job, i) => {
        return (
        <JobPosting key={i} job={job} applied={appliedFor} addApplied={(job) => {setAppliedFor(appliedFor.concat([job]))}} />
        )
        })}
        {!showApplied && searching && filtered.length === 0 && <div>No Results Matching Your Search</div>}
    </div>
  )
}

export default Jobs;