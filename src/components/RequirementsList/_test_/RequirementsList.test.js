import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RequirementsList from '../RequirementsList';
import pdfRequirements from './mocks';

describe('RequirementsList', () => {
    test('Renders headers', () => {
        render(<RequirementsList requirementsList={pdfRequirements['header']} />);
        const element1 = screen.getByText('Page Formatting & Font');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('Page Order & Section Formatting');
        expect(element2).toBeInTheDocument();
    });

    test('Renders requirements', () => {
        render(<RequirementsList requirementsList={pdfRequirements['header']} />);
        const element1 = screen.getByText('Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('No Blank pages in the documents');
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText('2 double spaces beneath title');
        expect(element3).toBeInTheDocument();
    });

})