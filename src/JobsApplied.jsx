import React, {useState, useEffect} from 'react';
import Accordion from './accordion.js';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './globalStyles.js';
import { lightTheme, darkTheme } from './Themes.js';
import '../public/compStyles.css';
import Header from './Header.jsx';
import { useNavigate} from 'react-router-dom';

function JobsApplied() {
  const [applied, setApplied] = useState([])
  const [user, setUser] = useState(-1);

  const navigate = useNavigate();

  const [theme, setTheme] = useState('dark');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const getApplied = () => {
    if(user >= 0){
      axios.get(`/applied/${user}`)
    .then((res) => {
      let results = res.data.rows
      setApplied(results)
    })
    .catch((err) => {
      console.log('error getting jobs applied to', err)
    })
    }

  }

  useEffect(() => {
    if (localStorage.hunter >= 0){
      setUser(Number(localStorage.hunter))

    }

  }, [])

  useEffect(() => {
    getApplied()

  }, [user])

  const clearApplied = () => {
    axios.delete(`/clear/${user}`)
    .then((res) => {
      getApplied()
    })
    .catch((err) => {
      console.log('error clearing applied history')
    })
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Header theme={theme} themeToggler={themeToggler} home={true} />
    <div className="overview">
    <h1 data-testid='appliedHeading'>{`User ${user} Applied to ${applied.length} Jobs`}</h1>
    <h3>The button below switches between jobs you have applied to and jobs you can apply to</h3>
    <button data-testid='hideapplied' className="applied" onClick={() => {navigate('/hunter')}}>view Job Openings</button>
    {applied.length > 0 && <h2>Click a job to view the details</h2>}
      <br/>
      {applied.length > 0 && <h3>You Have Applied to These Jobs:</h3>}
    {applied.length > 0 && <div className="postings"> {applied.map((job, i) => {
      return (<Accordion
        data-testid='appliedpostings'
        key={i}
        title={
          <div className="post-container">
          <h1 className="company">{job.poster}</h1>
          <h2 className="title">{`${job.title}`}</h2>
        </div>
        }
        content={<div>{`Company: ${job.poster}`}<br/> {job.description} <br/> {`Experience: ${job.experience}`}</div>}
        ind={i}
      />)
    })}
    </div>}
    {applied.length > 0 && <div><h2>Warning:  the button below will clear your applied to history</h2><button onClick={clearApplied} className='warning'>UnApply to All Jobs!!!</button></div>}
    {applied.length === 0 && <div data-testid='noappliedpostings'>You Are Not Applied To Any Jobs At The Moment</div>}
    </div>
    </>
    </ThemeProvider>
  )
}

export default JobsApplied;