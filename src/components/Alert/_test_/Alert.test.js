import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../Alert';

describe('Alert', () => {
    test('renders title', () => {
        render(
            <Alert 
                isOpen={true} 
                title='title' 
                continueAction={jest.fn()}
            />
        );
        const element = screen.getByText('title');
        expect(element).toBeInTheDocument();
    });

    test('does not render if not open', () => {
        render(
            <Alert 
                isOpen={false} 
                title='title' 
                continueAction={jest.fn()}
            />
        );
        const element = screen.queryByText('title');
        expect(element).not.toBeInTheDocument();
    });

    test('renders continue button', () => {
        render(
            <Alert 
                isOpen={true} 
                title='title' 
                continueAction={jest.fn()}
            />
        );
        const button = screen.getByText('Continue');
        expect(button).toBeInTheDocument();
    });

    test('calls continue action when clicked', () => {
        const continueAction = jest.fn();
        render(
            <Alert 
                isOpen={true} 
                title='title' 
                continueAction={continueAction}
            />
        );
        const button = screen.getByText('Continue');
        fireEvent.click(button);
        expect(continueAction).toHaveBeenCalled();
    });

    test('does not render back button if back action is not provided', () => {
        render(
            <Alert 
                isOpen={true} 
                title='title' 
                continueAction={jest.fn()}
            />
        );
        const button = screen.queryByText('Back');
        expect(button).not.toBeInTheDocument();
    });

    test('render back button if back action is provided', () => {
        render(
            <Alert 
                isOpen={true} 
                title='title' 
                continueAction={jest.fn()}
                backAction={jest.fn()}
            />
        );
        const button = screen.queryByText('Back');
        expect(button).toBeInTheDocument();
    });

    test('calls continue action when clicked', () => {
        const backAction = jest.fn();
        render(
            <Alert 
                isOpen={true} 
                title='title' 
                continueAction={jest.fn()}
                backAction={backAction}
            />
        );
        const button = screen.getByText('Back');
        fireEvent.click(button);
        expect(backAction).toHaveBeenCalled();
    });

    test('does not render description if description is not provided', () => {
        render(
            <Alert 
                isOpen={true} 
                title='title'
                continueAction={jest.fn()}
            />
        );
        const element = screen.queryByText('description');
        expect(element).not.toBeInTheDocument();
    });

    test('render description if description is provided', () => {
        render(
            <Alert 
                isOpen={true} 
                title='title' 
                desc='description'
                continueAction={jest.fn()}
            />
        );
        const element = screen.queryByText('description');
        expect(element).toBeInTheDocument();
    });
})
