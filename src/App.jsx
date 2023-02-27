import React, {useState, useEffect} from 'react';
import Jobs from './Jobs.jsx';
import {jobData} from './JobData.js';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './globalStyles.js';
import { lightTheme, darkTheme } from './Themes.js';
// import './compStyles.css';
import Header from './Header.jsx';
import axios from 'axios';
import Poster from './Poster.jsx';

function App() {
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(-1);
  const [jobs, setJobs] = useState([]);
  const [poster, setPoster] = useState('');
  const [posterIn, setPosterIn] = useState(false);
  const [loggedInPoster, setLoggedInPoster] = useState(-1);

  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  const getJobs = () => {
    axios.get('/jobs')
    .then((res) => {
      setJobs(res.data.rows)
    })
    .catch((err) => {
      console.log('error getting jobs from server') //keep err out for security, but can log if error occurs
    })
  }

  useEffect(() => {
    getJobs();
  }, [])

  const [theme, setTheme] = useState('dark');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const updateUser = (e) => {
    setUser(e.target.value);
  }

  const postUser = () => {
    axios.post('/user', {user: user})
    .then((res) => {
      setLoggedIn(!loggedIn)
    })
    .catch((err) => {
      console.log('error loging in user')
    })
  }

  const loggingIn = () => {
    if(user.length > 3) {
      alert("user id must be a positive whole number 3 digits or less")
      return
    }
    if (user.length > 0 && user.split('').every((char) => {return digits.indexOf(char) !== -1})) {
      setLoggedInUser(Number(user)) // now that it's verified turn into number for queries
      postUser()
    } else {
      alert("user id must be a positive whole number for security, the array of approved characters is ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']")
    }

  }

  const loginSkipped = () => {
    // setUser('login skipped')
    setLoggedIn(!loggedIn)
  }

  const loginPoster = () => {
    if(poster.length > 1) {
      alert("poster id must be a positive whole number only 1 digit")
      return
    }
    if (poster.length > 0 && digits.indexOf(poster) !== -1) {
      setLoggedInPoster(Number(poster)) // now that it's verified turn into number for queries
      postPoster();
    } else {
      alert("poster id must be a positive whole number for security, the array of approved characters is ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']")
    }
  }

  const postPoster = () => {
    axios.post('/poster', {poster: poster})
    .then((res) => {
      setPosterIn(!posterIn)
    })
    .catch((err) => {
      console.log('error loging in user')
    })
  }

  const updatePoster = (e) => {
    setPoster(e.target.value)
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Header theme={theme} themeToggler={themeToggler} />
        <div>
          {(!loggedIn && !posterIn) && <div className='overview'>
            <h1>Generic Job Site Demo</h1>
            {/* <h2>To speed run or view the front end only demo click below</h2>
            <button onClick={loginSkipped}>Skip Login</button> */}

            <p>
This login screen is set up in preparation to recieve a user or poster id  after authentication. To demonstrate handling user input attacks, I have only approved the digits 0-9 for the user input field and limited the length to a max of 3 digits. The job poster input field is similarly restricted to digits 0-9 but is limited to 1 digit to limit demo tester job postings.


               </p>
               <div className="demos">
                <div className="applicants">
               <h2>Job Hunter Demo</h2>
            <div className="login">
              <input name="userID" type="text" placeholder="Input a 'user id' number, 3 digits or less"  onChange={updateUser}></input>
              <br/>
              <button onClick={loggingIn}>Login to view job postings</button>
            </div>
            </div>
            <div className="posters">
            <h2>Job Poster Demo</h2>

            <div className="login">
              <input name="posterID" type="text" placeholder="Input a 'job poster id' number, 1 digit"  onChange={updatePoster}></input>
              <br/>
              <button onClick={loginPoster}>Login to post jobs</button>
            </div>
            </div>
            </div>

          </div>}
          {loggedIn && <Jobs jobs={jobs} user={loggedInUser} />}
          {posterIn && <Poster poster={loggedInPoster}/>}
          {(!loggedIn && !posterIn) && <div><br/><br/>last updated 2/22/23 improved styling of login page<br/>updated 2/16/23 needed to delete jobs from applied first so they could always be deleted<br/>updated 2/11/23 added job poster experience<br/>updated 1/22/23 added minimal back end to demo<br/>updated 1/18/23 minor style changes<br/>updated 1/17/23 after suggestions and finding missed edge cases</div>}
        </div>
      </>
    </ThemeProvider>
  )
}

export default App;