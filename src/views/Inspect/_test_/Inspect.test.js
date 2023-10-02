import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Inspect from '../Inspect';

describe('Inspect', () => {
    test('renders Inspect title', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()}/>);
        const element = screen.getByText('Inspect');
        expect(element).toBeInTheDocument();
    });

    test('Contains the continue button', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()}/>);
        const button = screen.getByText('Continue');
        expect(button).toBeInTheDocument();
    });

    test('Sets uploaded files to null when continue is pressed', () => {
        const setUploadedFiles = jest.fn();
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={setUploadedFiles}/>);
        const button = screen.getByText('Continue');
        fireEvent.click(button)
        expect(setUploadedFiles).toHaveBeenCalledWith(null);
    });
})
