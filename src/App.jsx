import React, {useState, useEffect} from 'react';
import Jobs from './Jobs.jsx';
import {jobData} from './JobData.js';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './globalStyles.js';
import { lightTheme, darkTheme } from './Themes.js';
import './compStyles.css';
import Header from './Header.jsx';
import axios from 'axios';

function App() {
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(-1);
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const [jobs, setJobs] = useState([]);

  const getJobs = () => {
    axios.get('/jobs')
    .then((res) => {
      setJobs(res.data)
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

  const loggingIn = () => {
    if(user.length > 3) {
      alert("user id must be a positive whole number 3 digits or less")
      return
    }
    if (user.length > 0 && user.split('').every((char) => {return digits.indexOf(char) !== -1})) {
      setLoggedInUser(Number(user)) // now that it's verified turn into number for queries
      setLoggedIn(!loggedIn)
    } else {
      alert("user id must be a positive whole number for security, the array of approved characters is ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']")
    }

  }

  const loginSkipped = () => {
    // setUser('login skipped')
    setLoggedIn(!loggedIn)
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Header theme={theme} themeToggler={themeToggler} />
        <div>
          {!loggedIn && <div className='overview'>
            <h1>Generic Job Site Demo</h1>
            <h2>To speed run or view the front end only demo click below</h2>
            <button onClick={loginSkipped}>Skip Login</button>
            <h2>Back end demo with user login input sanitization</h2>
            <p>Authentication is held off for now due to a lack of funding. ssl certificates are the main cost I am trying to avoid deploing with authentication. I am also using this EC2 instance for as many projects as possible to reduce the hours used while deployed. Therefore, photos are not used to save on the limited memory available. The back end is also limited to keep data size down, but should be enough to show I can deploy a functional back end.
              <br />
              <br />
              This login screen is set up in preparation to recieve a user id after authentication. To demonstrate handling user input attacks, I have only approved the digits 0-9 for the user input field and limited the length to a max of 3 digits. </p>
            <div>
              <input name="userID" type="text" placeholder="Input a 'user id' number, 8 digits or less"  onChange={updateUser}></input>
              <button onClick={loggingIn}>Login to view job postings</button>
            </div>

          </div>}
          {loggedIn && <Jobs jobs={jobs} user={loggedInUser} />}
          {!loggedIn && <div><br/><br/>last updated 1/18/23 minor style changes<br/>updated 1/17/23 after suggestions and finding missed edge cases</div>}
        </div>
      </>
    </ThemeProvider>
  )
}

export default App;