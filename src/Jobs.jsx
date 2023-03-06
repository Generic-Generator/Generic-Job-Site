import React, {useState, useEffect} from 'react';
import JobPosting from './JobPosting.jsx';
import JobsApplied from './JobsApplied.jsx';
import axios from 'axios';

function Jobs({jobs, user}) {
  const [appliedFor, setAppliedFor] = useState([])
  const [showApplied, setShowApplied] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchingXp, setSearchingXp] = useState(false);
  const [searched, setSearched] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [notApplied, setNotApplied] = useState(jobs);
  const [exp, setExp] = useState(-1);

  const displayApplied = () => {
    setShowApplied(!showApplied)
    setExp(-1)
  }

  const getApplied = () => {
    axios.get(`/applied/${user}`)
    .then((res) => {
      let results = res.data.rows
      setAppliedFor(results)
    })
    .catch((err) => {
      console.log('error getting jobs applied to', err)
    })
  }

  const interpretSearch = (e) => {
    setSearched(e.target.value)
  }

  const interpretExp = (e) => {
    if (e.target.value > -1){
      setSearchingXp(true)
    } else {
      setSearchingXp(false)
    }
    setExp(Number(e.target.value));
  }

  const searchedJobMaker = () => {
    let searchedHolder = [];

    if(exp > -1){

      if(searched.length < 3) {

        notApplied.forEach((job) => {
          if (job.experience <= exp) {
            searchedHolder.push(job);
          }
        });
      } else {
        notApplied.forEach((job) => {
        if ((job.title.toUpperCase().includes(searched.toUpperCase()) || job.description.toUpperCase().includes(searched.toUpperCase())) && job.experience <= exp) {
          searchedHolder.push(job);
        }
      });
      }
      searchedHolder.sort((a, b) => {
        if (a.experience < b.experience){
          return 1
        }
        if (a.experience > b.experience){
          return -1
        }
        return 0;
      })
      setFiltered(searchedHolder);
    } else {
      notApplied.forEach((job) => {
      if (job.title.toUpperCase().includes(searched.toUpperCase()) || job.description.toUpperCase().includes(searched.toUpperCase())) {
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

  }, [exp, notApplied, searched])

  useEffect(() => {
    let notAppliedHolder = []
    let appliedJobs = appliedFor.map((job) => {return job.job})
    jobs.forEach((job) => {
      if (appliedJobs.indexOf(job.job) === -1) {
        notAppliedHolder.push(job);
      }
    });

    setNotApplied(notAppliedHolder)

  }, [appliedFor])

  useEffect(() => {
    getApplied()
  }, [])

  return (
    <div className="jobs" data-testid='jobs'>
      {!showApplied && <h1>{`Jobs for user ${user === -1 ? 'loggin skipped': user}`}</h1>}
      {showApplied && <h1 data-testid='appliedHeading'>{`User ${user === -1 ? 'loggin skipped': user} Applied to ${appliedFor.length} Jobs`}</h1>}
      <h3>The button below switches between jobs you have applied to and jobs you can apply to</h3>
      {!showApplied && <button data-testid='seeapplied' className="applied" onClick={displayApplied}>view Jobs Applied to</button>}
      {showApplied && <button data-testid='hideapplied' className="applied" onClick={displayApplied}>view Job Openings</button>}
      {!showApplied &&
      <div className="search">
        <br/>
<h3>The jobs will filter to match the term typed below once it is at least 3 characters long</h3>
        <input name="Searchbar" type='text' placeholder='Search for Jobs' onChange={interpretSearch}></input>
<br/>
<h3>Select the years of experience you have to see jobs filtered to that much experince or less</h3>
<h4>These results are combined with the search and will sort most experience to least</h4>
          <label className="xp-label">Years of Experience:</label>
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

        {!showApplied && <div className="postscription"><h2>Job Postings</h2><h3>Once applied to the job posting will be removed from ones you can apply to</h3></div>}
        {showApplied && appliedFor.length > 0 && <h2>Click a job to view the details</h2>}
      {showApplied && <JobsApplied applied={appliedFor} user={user} clear={() => {getApplied()}}/>}
      {!showApplied && (!searching && !searchingXp) && notApplied.length > 0 && notApplied.map((job, i) => {
        return (
        <JobPosting key={i} ind={i} job={job} user={user} applied={appliedFor} addApplied={() => {getApplied()}} />
        )
        })}
        {!showApplied && (!searching && !searchingXp) && notApplied.length === 0 && <div>Looks Like You Have Applied To All Jobs!</div>}
        {!showApplied && (searching || searchingXp) && filtered.length > 0 && filtered.map((job, i) => {
        return (
        <JobPosting key={i} ind={i} job={job} user={user} applied={appliedFor} addApplied={() => {getApplied()}} />
        )
        })}
        {!showApplied && (searching || searchingXp) && filtered.length === 0 && appliedFor.length === 0 && <div>No Results Matching Your Search</div>}
        {!showApplied && (searching || searchingXp) && filtered.length === 0 && notApplied.length > 0 &&  appliedFor.length > 0 && <div>You Have Applied to All Jobs Matching Your Search</div>}

    </div>
  )
}

export default Jobs;