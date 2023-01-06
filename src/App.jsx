import React, {useState} from 'react';
import Jobs from './Jobs.jsx';

function App() {
  const [user, setUser] = useState('');

  const updateUser = (e) => {
    setUser(e.target.value);
  }

  const loggingIn = () => {
    console.log(user)
  }

  return (
    <div>
      <h1>Job Finder</h1>
      <input type="text" placeholder="temp username field" onChange={updateUser}></input>
      <button onClick={loggingIn}>sketch what I can first</button>
    </div>
  )
}

export default App;