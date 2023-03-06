import React from 'react';
// import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import App from '../src/App.jsx';
import axios from 'axios';
import Jobs from '../src/Jobs.jsx';
import {jobData} from '../src/JobData.js';
import Poster from '../src/Poster.jsx';

axios.defaults.baseURL = 'http://localhost:3007'


describe ('first sample test', function() {
  it('should render the header', () => {
    render(<App />)
  expect(screen.getByTestId('header')).toBeDefined();
  })


})

describe ('test of Jobs component', function() {

  it('should render the jobs page', async () => {
    render(<Jobs jobs={jobData} user={13}/>)

    await screen.findAllByTestId('jobs');

  expect(screen.getByTestId('jobs')).toBeDefined();
  })

  it('should render the jobs', async () => {
    render(<Jobs jobs={jobData} user={13}/>)

    await screen.findAllByTestId('jobpostings');

  expect(screen.getAllByTestId('jobpostings').length).toEqual(10);
  })

  it('should switch to applied with no results found', async () => {
    // const user = userEvent.setup()
    render(<Jobs jobs={jobData} user={13}/>)

    await userEvent.click(screen.getByTestId('seeapplied'));

    expect(screen.getByTestId('appliedHeading')).toBeDefined();


  })

  it('should axios request the 1 applied for by 13', async () => {
    render(<Jobs jobs={jobData} user={13}/>)

    await userEvent.click(screen.getByTestId('seeapplied'));

    await screen.findAllByTestId('appliedHeading');

    expect(screen.getByTestId('appliedpostings')).toBeDefined(); // axios not working yet/ can test non axios by importing jobs applied component

  })

  it('should axios request the 0 applied for by 1000', async () => {
    render(<Jobs jobs={jobData} user={1000}/>)

    await userEvent.click(screen.getByTestId('seeapplied'));

    await screen.findAllByTestId('appliedHeading');

    expect(screen.getByTestId('noappliedpostings')).toBeDefined();


  })


})

describe ('test poster experience', function() {

  it('should have no posting created for a new poster', async () => {
    render(<Poster poster={13} />)

    await screen.findAllByTestId('poster');

    expect(screen.queryByTestId('posting')).toBeNull();


  })

})