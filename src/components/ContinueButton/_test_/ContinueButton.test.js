import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import ContinueButton from '../ContinueButton';

describe('ContinueButton', () => {
    test('renders ContinueButton', () => {
        render(<ContinueButton action={jest.fn()}/>);
        const button = screen.getByText('Continue');
        expect(button).toBeInTheDocument();
    });

    test('calls action when clicked', async () => {
        const action = jest.fn();
        render(<ContinueButton action={action}/>);
        const button = screen.getByText('Continue');
        await act(() => {
            userEvent.click(button);
        });
        expect(action).toHaveBeenCalled();
    });
})
