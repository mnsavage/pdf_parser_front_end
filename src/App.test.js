import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {

  test('renders Upload link', () => {
    render(
    <BrowserRouter>
      <App />
    </BrowserRouter>);
    const linkElement = screen.getAllByText(/Upload/);
    expect(linkElement.length).not.toBe(0);
  });
  
  test('renders Confirm link', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>);
    const linkElement = screen.getAllByText(/Confirm/);
    expect(linkElement.length).not.toBe(0);
  });
  
  test('renders Inspect link', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>);
    const linkElement = screen.getAllByText(/Inspect/);
    expect(linkElement.length).not.toBe(0);
  });
  
})
