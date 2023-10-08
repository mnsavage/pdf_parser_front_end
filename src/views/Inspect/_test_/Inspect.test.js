import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import pdfRequirementsMet from './mocks';
import Inspect from '../Inspect';

describe('Inspect', () => {
    global.URL.createObjectURL = jest.fn();
    
    test('Renders Uploaded files title', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const element = screen.getByText('Uploaded Files');
        expect(element).toBeInTheDocument();
    });

    test('Contains the continue button', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button = screen.getByText('Continue');
        expect(button).toBeInTheDocument();
    });

    test('Contains the Download Summaries button', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button = screen.getByText('Download Summaries');
        expect(button).toBeInTheDocument();
    });

    test('Contains the Edit/ View Selected File button', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button = screen.getByText('Edit/ View Selected File');
        expect(button).toBeInTheDocument();
    });

    test('Sets uploaded files to null when continue is pressed', () => {
        const setUploadedFiles = jest.fn();
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={setUploadedFiles} requirementsList={pdfRequirementsMet.files} />);
        const button = screen.getByText('Continue');
        fireEvent.click(button)
        expect(setUploadedFiles).toHaveBeenCalledWith(null);
    });

    test('Displays the list of uploaded files', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const element1 = screen.getByText('file1.pdf');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('file2.pdf');
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText('file3.pdf');
        expect(element3).toBeInTheDocument();
    });

    test('Should render requirements list component', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const element1 = screen.getByText('Page Formatting & Font');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('Page Order & Section Formatting');
        expect(element2).toBeInTheDocument();
    });

    test('Should render show unmet conditions toggle', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const element1 = screen.getByText('Show only unmet conditons');
        expect(element1).toBeInTheDocument();
    });

    test('Selecting a file displays corresponding information in the requirements list', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()}  requirementsList={pdfRequirementsMet.files}/>);
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(2));
        const button1 = screen.getByText('file2.pdf');
        fireEvent.click(button1);
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(1));
        const button2 = screen.getByText('file3.pdf');
        fireEvent.click(button2);
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(2));
    });

    test('Selecting the show unmet conditions toggle only shows unmet conditions', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Show only unmet conditons');
        fireEvent.click(button1);
        await waitFor(() =>  expect(screen.queryByText('Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs')).not.toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('No Blank pages in the documents')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('2 double spaces beneath title')).not.toBeInTheDocument());
    });

    test('Should not show file list when editing a file', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        fireEvent.click(button1);
        await waitFor(() =>  expect(screen.queryByText('file1.pdf')).not.toBeInTheDocument());
    });

    test('Should show correct buttons when editing a file', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        fireEvent.click(button1);
        await waitFor(() =>  expect(screen.queryByText('Edit/ View Selected File')).not.toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Download Summaries')).not.toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Continue')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Reset All Conditions')).toBeInTheDocument());
    });

    test('Should render the file list and correct buttons when Contnue is pressed when editing a file', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        fireEvent.click(button1);
        await waitFor(() =>  expect(screen.queryByText('Continue')).toBeInTheDocument());
        fireEvent.click(screen.queryByText('Continue'));
        await waitFor(() =>  expect(screen.queryByText('Edit/ View Selected File')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Download Summaries')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Reset All Conditions')).not.toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('file1.pdf')).toBeInTheDocument());
    });


})
