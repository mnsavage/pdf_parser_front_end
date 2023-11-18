import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import FileList from '../FileList';

describe('FileList', () => {
    test('Displays list of files', () => {
        render(<FileList selectedIndex={0} names={['file1.pdf', 'file2.pdf', 'file3.pdf']} handleListItemClick={jest.fn}/>);
        const element1 = screen.getByText('file1.pdf');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('file2.pdf');
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText('file3.pdf');
        expect(element3).toBeInTheDocument();
    });

    test('Handels list item when a cell is clicked', async () => {
        const handleListItemClick = jest.fn();
        render(<FileList selectedIndex={0} names={['file1.pdf', 'file2.pdf', 'file3.pdf']} handleListItemClick={handleListItemClick}/>);
        const cell0 = screen.getByText('file1.pdf');
        await act(() => {
            userEvent.click(cell0)
        });
        expect(handleListItemClick).toHaveBeenCalledWith(0);
        const cell1 = screen.getByText('file2.pdf');
        await act(() => {
            userEvent.click(cell1)
        });
        expect(handleListItemClick).toHaveBeenCalledWith(1);
    });

})