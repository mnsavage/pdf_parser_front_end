import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import OptionDropdown from '../OptionDropdown';

describe('OptionDropdown', () => {
    test('Displays option button', () => {
        render(<OptionDropdown 
            setFilterFunction={jest.fn()} 
            setResetConditionsAlertOpen={jest.fn()}
            setResetCommentsAlertOpen={jest.fn()}
            disabled={false}
        />);
        const element1 = screen.getByTestId('settings-button');
        expect(element1).toBeInTheDocument();
    });

    test('Displays toggles and buttons when option button is clicked', async () => {
        render(<OptionDropdown 
            setFilterFunction={jest.fn()} 
            setResetConditionsAlertOpen={jest.fn()}
            setResetCommentsAlertOpen={jest.fn()}
            disabled={false}
        />);
        expect(screen.queryByText('Show only unmet requirements')).not.toBeInTheDocument();
        expect(screen.queryByText('Show only met requirements')).not.toBeInTheDocument();
        expect(screen.queryByText('Show only automated requirements')).not.toBeInTheDocument();
        expect(screen.queryByText('Reset automated conditions to original')).not.toBeInTheDocument();
        expect(screen.queryByText('Clear all comments')).not.toBeInTheDocument();

        await act(() => {
            userEvent.click(screen.getByTestId('settings-button'));
        });

        await waitFor(() =>  expect(screen.queryByText('Show only unmet requirements')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Show only met requirements')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Show only automated requirements')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Show only not automated requirements')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Reset automated conditions to original')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Clear all comments')).toBeInTheDocument());
    });

    test('Should close drop down when options button is clicked again', async () => {
        render(<OptionDropdown 
            setFilterFunction={jest.fn()} 
            setResetConditionsAlertOpen={jest.fn()}
            setResetCommentsAlertOpen={jest.fn()}
            disabled={false}
        />);
        expect(screen.queryByText('Show only unmet requirements')).not.toBeInTheDocument();

        await act(() => {
            userEvent.click(screen.getByTestId('settings-button'));
        });

        await waitFor(() =>  expect(screen.queryByText('Show only unmet requirements')).toBeInTheDocument());

        await act(() => {
            userEvent.click(screen.getByTestId('settings-button'));
        });

        await waitFor(() =>  expect(screen.queryByText('Show only unmet requirements')).not.toBeInTheDocument());
    });

    test('Should call setFilterFunction when a toggle Show only unmet requirements is clicked', async () => {
        const setFilterFunction = jest.fn();
        render(<OptionDropdown 
            setFilterFunction={setFilterFunction} 
            setResetConditionsAlertOpen={jest.fn()}
            setResetCommentsAlertOpen={jest.fn()}
            disabled={false}
        />);

        await act(() => {
            userEvent.click(screen.getByTestId('settings-button'));
        });

        await waitFor(() =>  expect(screen.queryByText('Show only unmet requirements')).toBeInTheDocument());

        const toggle = screen.getByText('Show only unmet requirements');
        await act(() => {
            userEvent.click(toggle);
        });

        expect(setFilterFunction).toHaveBeenCalled();
    });

    test('Should call setFilterFunction when a toggle Show only met requirements is clicked', async () => {
        const setFilterFunction = jest.fn();
        render(<OptionDropdown 
            setFilterFunction={setFilterFunction} 
            setResetConditionsAlertOpen={jest.fn()}
            setResetCommentsAlertOpen={jest.fn()}
            disabled={false}
        />);

        await act(() => {
            userEvent.click(screen.getByTestId('settings-button'));
        });

        await waitFor(() =>  expect(screen.queryByText('Show only unmet requirements')).toBeInTheDocument());

        const toggle = screen.getByText('Show only met requirements');
        await act(() => {
            userEvent.click(toggle);
        });

        expect(setFilterFunction).toHaveBeenCalled();
    });

    test('Should call setFilterFunction when a toggle Show only automated requirements is clicked', async () => {
        const setFilterFunction = jest.fn();
        render(<OptionDropdown 
            setFilterFunction={setFilterFunction} 
            setResetConditionsAlertOpen={jest.fn()}
            setResetCommentsAlertOpen={jest.fn()}
            disabled={false}
        />);

        await act(() => {
            userEvent.click(screen.getByTestId('settings-button'));
        });

        await waitFor(() =>  expect(screen.queryByText('Show only unmet requirements')).toBeInTheDocument());

        const toggle = screen.getByText('Show only automated requirements');
        await act(() => {
            userEvent.click(toggle);
        });

        expect(setFilterFunction).toHaveBeenCalled();
    });

    test('Should call setFilterFunction when a toggle Show only not automated requirements is clicked', async () => {
        const setFilterFunction = jest.fn();
        render(<OptionDropdown 
            setFilterFunction={setFilterFunction} 
            setResetConditionsAlertOpen={jest.fn()}
            setResetCommentsAlertOpen={jest.fn()}
            disabled={false}
        />);

        await act(() => {
            userEvent.click(screen.getByTestId('settings-button'));
        });

        await waitFor(() =>  expect(screen.queryByText('Show only not automated requirements')).toBeInTheDocument());

        const toggle = screen.getByText('Show only unmet requirements');
        await act(() => {
            userEvent.click(toggle);
        });

        expect(setFilterFunction).toHaveBeenCalled();
    });

    test('Should call setResetConditionsAlertOpen when a button Reset automated conditions to original is clicked', async () => {
        const setResetConditionsAlertOpen = jest.fn();
        render(<OptionDropdown 
            setFilterFunction={jest.fn()} 
            setResetConditionsAlertOpen={setResetConditionsAlertOpen}
            setResetCommentsAlertOpen={jest.fn()}
            disabled={false}
        />);

        await act(() => {
            userEvent.click(screen.getByTestId('settings-button'));
        });

        await waitFor(() =>  expect(screen.queryByText('Reset automated conditions to original')).toBeInTheDocument());

        const button = screen.getByText('Reset automated conditions to original');
        await act(() => {
            userEvent.click(button);
        });

        expect(setResetConditionsAlertOpen).toHaveBeenCalled();
    });

    test('Should call setResetConditionsAlertOpen when a button Clear all comments is clicked', async () => {
        const setResetCommentsAlertOpen = jest.fn();
        render(<OptionDropdown 
            setFilterFunction={jest.fn()} 
            setResetConditionsAlertOpen={jest.fn()}
            setResetCommentsAlertOpen={setResetCommentsAlertOpen}
            disabled={false}
        />);

        await act(() => {
            userEvent.click(screen.getByTestId('settings-button'));
        });

        await waitFor(() =>  expect(screen.queryByText('Reset automated conditions to original')).toBeInTheDocument());

        const button = screen.getByText('Clear all comments');
        await act(() => {
            userEvent.click(button);
        });

        expect(setResetCommentsAlertOpen).toHaveBeenCalled();
    });
});
