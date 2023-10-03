import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContinueButton from '../ContinueButton';

describe('ContinueButton', () => {
    test('renders ContinueButton', () => {
        render(<ContinueButton action={jest.fn()}/>);
        const button = screen.getByText('Continue');
        expect(button).toBeInTheDocument();
    });

    test('calls action when clicked', () => {
        const action = jest.fn();
        render(<ContinueButton action={action}/>);
        const button = screen.getByText('Continue');
        fireEvent.click(button);
        expect(action).toHaveBeenCalled();
    });
})
