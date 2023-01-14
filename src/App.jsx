import React, {useState} from 'react';
import Jobs from './Jobs.jsx';
import {jobData} from './JobData.js';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './globalStyles.js';
import { lightTheme, darkTheme } from './Themes.js';
import Header from './Header.jsx';

function App() {
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  const [theme, setTheme] = useState('dark');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const updateUser = (e) => {
    setUser(e.target.value);
  }

  const loggingIn = () => {
    if (user.length > 0 && user.split('').every((char) => {return digits.indexOf(char) !== -1})) {
      setLoggedIn(!loggedIn)
    } else {
      alert("user id must be a number for security Whitelist = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']")
    }

  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Header theme={theme} themeToggler={themeToggler} />
        <div>
          {!loggedIn && <div className='overview'>
            <h1>Generic Job Site Front End</h1>
            <h3>This is A Front End Only Demo, so nothing will persist on refresh</h3>
            <p>This login screen is set up in preparation for how the site would respond after authentication. Authentication and back end are held off for now due to lack of funding. The only thing I have recieved charges for were data transfers between my deployed backend and server. As for authentication, during my final project at Hack Reactor, we were not able to deploy because we needed an ssl certificate, which for the most part costs money.
              <br />
              <br />
              To demonstrate that I have thought about user input attacks, I have whitelisted the digits 0-9 for the user input field to simulate making sure the users Id returned after authentication is a number. </p>
            <div>
              <input type="text" placeholder="input a 'user' number" onChange={updateUser}></input>
              <button onClick={loggingIn}>Login to view job board</button>
            </div>

          </div>}
          {loggedIn && <Jobs jobs={jobData} user={user} />}
        </div>
      </>
    </ThemeProvider>
  )
}

export default App;