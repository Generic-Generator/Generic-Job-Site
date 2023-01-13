import React, {useState, useEffect} from 'react';
import JobPosting from './JobPosting.jsx';
import JobsApplied from './JobsApplied.jsx';

function Jobs({jobs, user}) {
  const [appliedFor, setAppliedFor] = useState([])
  const [showApplied, setShowApplied] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [notApplied, setNotApplied] = useState(jobs);
  const [exp, setExp] = useState(-1);

  const displayApplied = () => {
    setShowApplied(!showApplied)
  }

  const interpretSearch = (e) => {
    setSearched(e.target.value)
  }

  const interpretExp = (e) => {
    if (e.target.value > -1){
      setSearching(true)
    }
    setExp(Number(e.target.value));
  }

  const searchedJobMaker = () => {
    let searchedHolder = [];

    if(exp > -1){

      if(searched.length < 3) {

        notApplied.forEach((job) => {
          if (job.Experience <= exp) {
            searchedHolder.push(job);
          }
        });
      } else {
        notApplied.forEach((job) => {
        if ((job.Title.toUpperCase().includes(searched.toUpperCase()) || job.Description.toUpperCase().includes(searched.toUpperCase())) && job.Experience <= exp) {
          searchedHolder.push(job);
        }
      });
      }
      searchedHolder.sort((a, b) => {
        if (a.Experience < b.Experience){
          return 1
        }
        if (a.Experience > b.Experience){
          return -1
        }
        return 0;
      })
      setFiltered(searchedHolder);
    } else {
      notApplied.forEach((job) => {
      if (job.Title.toUpperCase().includes(searched.toUpperCase()) || job.Description.toUpperCase().includes(searched.toUpperCase())) {
        searchedHolder.push(job);
      }
    });
    setFiltered(searchedHolder);
    }


  };

  useEffect(() => {
    if (searched.length !== 2) {
      if (searched.length === 3 && !searching) {
        setSearching(!searching);
      }
      searchedJobMaker();
    } else {
      setSearching(!searching);
    }
  }, [((searched.length > 2) && (searched))])

  useEffect(() => {
    searchedJobMaker();

  }, [exp, notApplied])

  useEffect(() => {
    let notAppliedHolder = []
    let appliedJobs = appliedFor.map((job) => {return job.Job})
    notApplied.forEach((job) => {
      if (appliedJobs.indexOf(job.Job) === -1) {
        notAppliedHolder.push(job);
      }
    });

    setNotApplied(notAppliedHolder)

  }, [appliedFor])

  return (
    <div>
      {!showApplied && <h1>{`Jobs for ${user}`}</h1>}
      {showApplied && <h1>{`Jobs user ${user} Applied for`}</h1>}
      {!showApplied && <button onClick={displayApplied}>view Jobs Applied to</button>}
      {showApplied && <button onClick={displayApplied}>view Job Openings</button>}
      {!showApplied &&
      <div>
        <br/>
        <input type='text' placeholder='Search for Jobs' onChange={interpretSearch}></input>
        <br/>
          <label>Years of Experience:</label>
          <select name="exp" id="exp" onChange={interpretExp}>
          <option value={-1}>Select</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <br/>
        </div>}
      {showApplied && <JobsApplied applied={appliedFor}/>}
      {!showApplied && !searching && notApplied.length > 0 && notApplied.map((job, i) => {
        return (
        <JobPosting key={i} job={job} applied={appliedFor} addApplied={(job) => {setAppliedFor(appliedFor.concat([job]))}} />
        )
        })}
        {!showApplied && !searching && notApplied.length === 0 && <div>Looks Like You Have Applied To All Jobs!</div>}
        {!showApplied && searching && filtered.length > 0 && filtered.map((job, i) => {
        return (
        <JobPosting key={i} job={job} applied={appliedFor} addApplied={(job) => {setAppliedFor(appliedFor.concat([job]))}} />
        )
        })}
        {!showApplied && searching && filtered.length === 0 && appliedFor.length === 0 && <div>No Results Matching Your Search</div>}
        {!showApplied && searching && filtered.length === 0 && notApplied.length > 0 &&  appliedFor.length > 0 && <div>You Have Applied to All Jobs Matching Your Search</div>}

    </div>
  )
}

export default Jobs;