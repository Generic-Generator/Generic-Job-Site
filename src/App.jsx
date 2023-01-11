import React, {useState} from 'react';
import Jobs from './Jobs.jsx';
import {jobData} from './JobData.js';

function App() {
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  const updateUser = (e) => {
    setUser(e.target.value);
  }

  const loggingIn = () => {
    if (user.split('').every((char) => {return digits.indexOf(char) !== -1})) {
      setLoggedIn(!loggedIn)
    } else {
      alert("user id must be a number for security Whitelist = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']")
    }

  }

  return (
    <div>
      {!loggedIn && <div>
        <h1>Job Finder</h1>
        <h3>Front End Only right now, so nothing will persist on refresh</h3>
        {/* taking security coding challenge and learning a lot since I glossed over this, should use user id to be able to validate its a number to help avoid sql injection attacks while retrieving user ids */}
        <input type="text" placeholder="temp user id field" onChange={updateUser}></input>
        <button onClick={loggingIn}>view job board</button>

      </div>}
      {loggedIn && <Jobs jobs={jobData}  user={user}/>}
    </div>
  )
}

export default App;