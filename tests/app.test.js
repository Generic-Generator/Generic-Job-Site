import React from 'react';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import Header from '../src/Header.jsx';
import App from '../src/App.jsx';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3007'

describe ('first sample test', function() {
  it('should render the header', () => {
    render(<App />)
  expect(screen.getByTestId('header')).toBeDefined();
  })


})