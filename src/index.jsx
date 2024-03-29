// import React, {lazy} from 'react';
// import { createRoot } from 'react-dom/client';
// const App = lazy(() => import('./App.jsx'));
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Jobs from './Jobs.jsx';
import Poster from './Poster.jsx';
import JobsApplied from './JobsApplied.jsx';
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Routes,
//   Route,
// } from "react-router-dom";
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <div className="overview">
      <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/hunter' element={<Jobs />}/>
      <Route path='/applied-to' element={<JobsApplied />}/>
      <Route path='/job-poster' element={<Poster />}/>
    </Routes>
    </div>
    </Router>
  </React.StrictMode>
);