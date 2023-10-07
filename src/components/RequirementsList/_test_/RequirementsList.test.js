import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RequirementsList from '../RequirementsList';
import pdfRequirements from './mocks';

describe('RequirementsList', () => {
    test('Renders headers', () => {
        render(<RequirementsList requirementsList={pdfRequirements['header']} disabled={false} showUnmet={false} />);
        const element1 = screen.getByText('Page Formatting & Font');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('Page Order & Section Formatting');
        expect(element2).toBeInTheDocument();
    });

    test('Renders requirements', () => {
        render(<RequirementsList requirementsList={pdfRequirements['header']} disabled={false} showUnmet={false} />);
        const element1 = screen.getByText('Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('No Blank pages in the documents');
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText('2 double spaces beneath title');
        expect(element3).toBeInTheDocument();
    });

    test('When a header is collapsed, the requirements are hidden', async () => {
        render(<RequirementsList requirementsList={pdfRequirements['header']} disabled={false} showUnmet={false} />);
        const textElement1 = 'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs';
        const textElement2 = '2 double spaces beneath title';
        expect(screen.queryByText(textElement1)).toBeInTheDocument();
        expect(screen.queryByText(textElement2)).toBeInTheDocument();
        const button1 = screen.getByText('Page Formatting & Font');
        fireEvent.click(button1);
        await waitFor(() =>  expect(screen.queryByText(textElement1)).not.toBeInTheDocument());
        expect(screen.queryByText(textElement2)).toBeInTheDocument();
        fireEvent.click(button1);
        await waitFor(() =>  expect(screen.queryByText(textElement1)).toBeInTheDocument());
        expect(screen.queryByText(textElement2)).toBeInTheDocument();
    });

    test('Checkboxes are correctly initialized on render', () => {
        render(<RequirementsList requirementsList={pdfRequirements['header']} disabled={true} showUnmet={false} />);
        const elements = screen.getAllByTestId('CheckBoxIcon');
        expect(elements.length).toBe(2);
    });

    test('Checkboxes can be changed when they are not disabled', async () => {
        render(<RequirementsList requirementsList={pdfRequirements['header']} disabled={false} showUnmet={false} />);
        const button1 = screen.getByText('Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs');
        fireEvent.click(button1);
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(1));
    });

    test('Checkboxes can not be changed when they are disabled', async () => {
        render(<RequirementsList requirementsList={pdfRequirements['header']} disabled={true} showUnmet={false} />);
        const button1 = screen.getByText('Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs');
        fireEvent.click(button1);
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(2));
    });

    test('When showUnmet is true, only unmet conditions are shown', () => {
        render(<RequirementsList requirementsList={pdfRequirements['header']} disabled={true} showUnmet={true} />);
        const element1 = screen.queryByText('Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs');
        expect(element1).not.toBeInTheDocument();
        const element2 = screen.queryByText('No Blank pages in the documents');
        expect(element2).toBeInTheDocument();
        const element3 = screen.queryByText('2 double spaces beneath title');
        expect(element3).not.toBeInTheDocument();
    });

    test('When showUnmet is false, only all conditions are shown', () => {
        render(<RequirementsList requirementsList={pdfRequirements['header']} disabled={true} showUnmet={false} />);
        const element1 = screen.getByText('Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('No Blank pages in the documents');
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText('2 double spaces beneath title');
        expect(element3).toBeInTheDocument();
    });

})