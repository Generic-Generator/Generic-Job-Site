import React, {useState} from 'react';
import Jobs from './Jobs.jsx';

function App() {
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const updateUser = (e) => {
    setUser(e.target.value);
  }

  const loggingIn = () => {
    console.log(user)
    setLoggedIn(!loggedIn)
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
      {loggedIn && <Jobs jobs={[1,1,1,1,1,1,1,1]}  user={user}/>}
    </div>
  )
}

export default App;