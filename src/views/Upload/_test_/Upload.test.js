import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Upload from '../Upload';

describe('Upload', () => {
    test('Contains upload title', () => {
        render(<Upload setPage={jest.fn()} setUploadedFiles={jest.fn()}/>);
        const element = screen.getByText('Upload Theses or Dissertations as PDFs');
        expect(element).toBeInTheDocument();
    });

    test('Contains file input', () => {
        render(<Upload setPage={jest.fn()} setUploadedFiles={jest.fn()}/>);
        const button = screen.getByText('Browse Local Files');
        expect(button).toBeInTheDocument();
    });

    test('Contains the continue button', () => {
        render(<Upload setPage={jest.fn()} setUploadedFiles={jest.fn()}/>);
        const button = screen.getByText('Continue');
        expect(button).toBeInTheDocument();
    });

    test('Render alert when the Continue button is pressed and no files are uploaded', async () => {
        render(<Upload setPage={jest.fn()} setUploadedFiles={jest.fn()}/>);
        const button = screen.getByText('Continue');
        fireEvent.click(button);
        await waitFor(() =>  expect(screen.getByText('Please select files to upload')).toBeInTheDocument());
    });

    test('Lists files when they are given on init', () => {
        render(<Upload setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()}/>);
        const element1 = screen.getByText('file1.pdf');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('file2.pdf');
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText('file3.pdf');
        expect(element3).toBeInTheDocument();
        const label = screen.getByText('Attached Files');
        expect(label).toBeInTheDocument();
    });

    test('Does not list files when they are not given on init', () => {
        render(<Upload setPage={jest.fn()} setUploadedFiles={jest.fn()}/>);
        const label = screen.queryByText('Attached Files');
        expect(label).not.toBeInTheDocument();
    });
})
