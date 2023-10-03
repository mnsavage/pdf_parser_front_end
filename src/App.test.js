import React from 'react'; 
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {

  test('renders header', () => {
    render(<App />);
    const element = screen.getByAltText('Script A Logo');
    expect(element).toBeInTheDocument();
  });
  test('renders title', () => {
    render(<App />);
    const element = screen.getByText('Verify Electronic Theses & Dissertations Format');
    expect(element).toBeInTheDocument();
  });
  test('renders upload page first', () => {
    render(<App />);
    const element = screen.getByText('Upload Theses or Dissertations as PDFs');
    expect(element).toBeInTheDocument();
  });
  
})
