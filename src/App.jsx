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
        <input type="text" placeholder="temp username field" onChange={updateUser}></input>
        <button onClick={loggingIn}>sketch what I can first</button>

      </div>}
      {loggedIn && <Jobs jobs={[1,1,1,1,1,1,1,1]}  user={user}/>}
    </div>
  )
}

export default App;