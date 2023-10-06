import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Inspect from '../Inspect';

describe('Inspect', () => {
    global.URL.createObjectURL = jest.fn();
    
    test('Renders Uploaded files title', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()}/>);
        const element = screen.getByText('Uploaded Files');
        expect(element).toBeInTheDocument();
    });

    test('Contains the continue button', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()}/>);
        const button = screen.getByText('Continue');
        expect(button).toBeInTheDocument();
    });

    test('Contains the Download Summaries button', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()}/>);
        const button = screen.getByText('Download Summaries');
        expect(button).toBeInTheDocument();
    });

    test('Contains the Edit/ View Selected File button', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()}/>);
        const button = screen.getByText('Edit/ View Selected File');
        expect(button).toBeInTheDocument();
    });

    test('Sets uploaded files to null when continue is pressed', () => {
        const setUploadedFiles = jest.fn();
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={setUploadedFiles}/>);
        const button = screen.getByText('Continue');
        fireEvent.click(button)
        expect(setUploadedFiles).toHaveBeenCalledWith(null);
    });

    test('Displays the list of uploaded files', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} />);
        const element1 = screen.getByText('file1.pdf');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('file2.pdf');
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText('file3.pdf');
        expect(element3).toBeInTheDocument();
    });

})
