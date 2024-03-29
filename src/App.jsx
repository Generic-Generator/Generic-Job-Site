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
import { useNavigate} from 'react-router-dom';

function App() {
  const [user, setUser] = useState('');
  const [poster, setPoster] = useState('');

  const navigate = useNavigate();

  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

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

      navigate('/hunter')
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
      localStorage.hunter = Number(user)
      postUser()
    } else {
      alert("user id must be a positive whole number for security, the array of approved characters is ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']")
    }

  }

  const loginPoster = () => {
    if(poster.length > 1) {
      alert("poster id must be a positive whole number only 1 digit")
      return
    }
    if (poster.length > 0 && digits.indexOf(poster) !== -1) {
      localStorage.poster = Number(poster)
      postPoster();
    } else {
      alert("poster id must be a positive whole number for security, the array of approved characters is ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']")
    }
  }

  const postPoster = () => {
    axios.post('/poster', {poster: poster})
    .then((res) => {
      navigate('/job-poster')
    })
    .catch((err) => {
      console.log('error loging in user')
    })
  }

  const updatePoster = (e) => {
    setPoster(e.target.value)
  }

  const viewOriginalPostings = () => {
    localStorage.poster = 10
    navigate('/job-poster')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Header theme={theme} themeToggler={themeToggler} home={false}/>
        <div>
          {<div className='overview'>
            <h1>Generic Job Site Demo</h1>


            <p className="walkthrough">
This login screen is set up to recieve a hunter or poster id to test out being that user. Once logged in, interactions with the demo will be saved to the account number you are signed into. You can make a new job as a poster, then go back home and log in as a hunter to apply to the job you just created. If you log back into the poster you can confirm the hunters who have applied to your posting. Log into the same user on a different device or refresh and see the data persit.
</p>
<p>
 If you have logged in to one of the demos before, the returning hunter/poster button will take you back in as the last user number you input for that demo. For example if you use 3 to login as a hunter and then 7 to login as a poster, the returning hunter button will log you in as hunter 3 and the returning poster button will log you in as poster 7. If you then demo hunter 4 to see how multiple applicants show up as a poster, the returning hunter button will log you in as hunter 4.
</p>
<p className="design">

To demonstrate handling user input attacks, I have only approved the digits 0-9 for the user input field and limited the length to a max of 3 digits. The job poster input field is similarly restricted to digits 0-9 but is limited to 1 digit to limit demo tester job postings.


               </p>
               <div className="demos">
                <div className="applicants">
               <h2>Job Hunter Demo</h2>
            <div className="login">
              <input name="userID" type="text" placeholder="Input a 'user id' number, 3 digits or less"  onChange={updateUser}></input>
              <br/>
              <button onClick={loggingIn}>Login to view job postings</button>
              <button onClick={() => {navigate('/hunter')}}>Returning Hunter</button>
            </div>
            </div>
            <div className="posters">
            <h2>Job Poster Demo</h2>

            <div className="login">
              <input name="posterID" type="text" placeholder="Input a 'job poster id' number, 1 digit"  onChange={updatePoster}></input>
              <br/>
              <button onClick={loginPoster}>Login to post jobs</button>
              <button onClick={() => {navigate('/job-poster')}}>Returning Poster</button>
              <button onClick={viewOriginalPostings}>View Perm Postings</button>
            </div>
            </div>
            </div>

          </div>}

          {<div><br/><br/>last updated 10/10/23 View Permanent Postings button added<br/>updated 10/5/23 returning user buttons added<br/>updated 9/29/23 split into multi page app<br/>updated 2/22/23 improved styling of login page<br/>updated 2/16/23 needed to delete jobs from applied first so they could always be deleted<br/>updated 2/11/23 added job poster experience<br/>updated 1/22/23 added minimal back end to demo<br/>updated 1/18/23 minor style changes<br/>updated 1/17/23 after suggestions and finding missed edge cases</div>}
        </div>
      </>
    </ThemeProvider>
  )
}

export default App;