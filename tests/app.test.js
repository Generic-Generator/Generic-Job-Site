import React from 'react';
// import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import App from '../src/App.jsx';
import axios from 'axios';
import Jobs from '../src/Jobs.jsx';
import {jobData} from '../src/JobData.js';

axios.defaults.baseURL = 'http://localhost:3007'

describe ('first sample test', function() {
  it('should render the header', () => {
    render(<App />)
  expect(screen.getByTestId('header')).toBeDefined();
  })


})

describe ('test of Jobs component', function() {
  it('should render the header', async () => {
    render(<Jobs jobs={jobData} user={1000}/>)

    await screen.findAllByTestId('jobs');

  expect(screen.getByTestId('jobs')).toBeDefined();
  })


})