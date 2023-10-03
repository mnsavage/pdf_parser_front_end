import React from 'react';
import { render, screen } from '@testing-library/react';
import Confirm from '../Confirm';

describe('Confirm', () => {
    global.URL.createObjectURL = jest.fn();
    test('Displays Uploaded Files title', () => {
        render(<Confirm setPage={jest.fn()} uploadedFiles={[]}/>);
        const element = screen.getByText('Uploaded Files');
        expect(element).toBeInTheDocument();
    });

    test('Displays the list of uploaded files', () => {
        render(<Confirm setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]}/>);
        const element1 = screen.getByText('file1.pdf');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('file2.pdf');
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText('file3.pdf');
        expect(element3).toBeInTheDocument();
    });
})
