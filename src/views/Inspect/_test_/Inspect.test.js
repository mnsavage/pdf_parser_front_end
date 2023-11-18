import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
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

    test('Renders alert when continue is pressed', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button = screen.getByText('Continue');
        await act(() => {
            userEvent.click(button);
        });
        await waitFor(() =>  expect(screen.getByText('Are you sure you want to continue?')).toBeInTheDocument());
    });

    test('Sets uploaded files to null when continue on the alert is pressed', async () => {
        const setUploadedFiles = jest.fn();
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={setUploadedFiles} requirementsList={pdfRequirementsMet.files} />);
        const button = screen.getByText('Continue');
        await act(() => {
            userEvent.click(button)
        });
        await waitFor(() =>  expect(screen.getByText('Are you sure you want to continue?')).toBeInTheDocument());
        const alertButton = screen.getAllByText('Continue')[1];
        await act(() => {
            userEvent.click(alertButton);
        });
        expect(setUploadedFiles).toHaveBeenCalledWith(null);
    });

    test('Stays on the same page when back on the alert is pressed', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button = screen.getByText('Continue');
        await act(() => {
            userEvent.click(button)
        });
        await waitFor(() =>  expect(screen.getByText('Are you sure you want to continue?')).toBeInTheDocument());
        const alertButton = screen.getByText('Back');
        await act(() => {
            userEvent.click(alertButton);
        });
        await waitFor(() =>  expect(screen.queryByText('Are you sure you want to continue?')).not.toBeInTheDocument());
        const element = screen.getByText('Uploaded Files');
        expect(element).toBeInTheDocument();
    });

    test('Displays the list of uploaded files', () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const element1 = screen.getByText('lname1.fname1.dissertation');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('lname2.fname2.thesis');
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText('lname3.fname3.dissertation');
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
        const button1 = screen.getByText('lname2.fname2.thesis');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(1));
        const button2 = screen.getByText('lname3.fname3.dissertation');
        await act(() => {
            userEvent.click(button2);
        });
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(2));
    });

    test('Selecting the show unmet conditions toggle only shows unmet conditions', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Show only unmet conditons');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('No Blank pages in the documents')).not.toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('2 double spaces beneath title')).toBeInTheDocument());
    });

    test('Should not show file list when editing a file', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('lname1.fname1.dissertation')).not.toBeInTheDocument());
    });

    test('Should show correct buttons when editing a file', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('Edit/ View Selected File')).not.toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Download Summaries')).not.toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Continue')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Reset All Conditions')).toBeInTheDocument());
    });

    test('Does not render alert when continue is pressed when editing a file if no edits are made', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('Continue')).toBeInTheDocument());
        await act(() => {
            userEvent.click(screen.queryByText('Continue'));
        });
        await waitFor(() =>  expect(screen.queryByText('Save changes?')).not.toBeInTheDocument());
        const element = screen.queryByText('Uploaded Files');
        expect(element).toBeInTheDocument();
    });

    test('Should render alert when continue is pressed when editing a file if edits are made', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('Continue')).toBeInTheDocument());
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(1));
        await act(() => {
            userEvent.click(screen.queryByText('Continue'));
        });
        await waitFor(() =>  expect(screen.getByText('Save changes?')).toBeInTheDocument());
    });

    test('Should not render alert when continue is pressed when editing a file if edits are made but then reversed', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('Continue')).toBeInTheDocument());
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(1));
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(0));
        await act(() => {
            userEvent.click(screen.queryByText('Continue'));
        });
        await waitFor(() =>  expect(screen.queryByText('Save changes?')).not.toBeInTheDocument());
        const element = screen.queryByText('Uploaded Files');
        expect(element).toBeInTheDocument();
    });

    test('Should render the file list and correct buttons when continue on the alert is pressed when editing a file', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('Continue')).toBeInTheDocument());
        await act(() => {
            userEvent.click(screen.queryByText('Continue'));
        });
        await waitFor(() =>  expect(screen.queryByText('Edit/ View Selected File')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Download Summaries')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('Reset All Conditions')).not.toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByText('lname1.fname1.dissertation')).toBeInTheDocument());
    });

    test('Stays on the same page when back on the alert is pressed when editing a file', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('Continue')).toBeInTheDocument());
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(1));
        await act(() => {
            userEvent.click(screen.queryByText('Continue'));
        });
        await waitFor(() =>  expect(screen.getByText('Save changes?')).toBeInTheDocument());
        const alertButton = screen.getByText('Back');
        await act(() => {
            userEvent.click(alertButton);
        });
        await waitFor(() =>  expect(screen.queryByText('Save changes?')).not.toBeInTheDocument());
        const element = screen.queryByText('Uploaded Files');
        expect(element).not.toBeInTheDocument();
    });

    test('Checkboxes can be changed when editing', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('Continue')).toBeInTheDocument());
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(1));
    });

    test('Checkboxes can not be changed when not editing', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(2));
    });

    test('Show edited when a requirement is edited', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(0));
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(1));
    });

    test('Remove edited when a requirement is edited twice', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(0));
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(1));
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(0));
    });

    test('Should show edited when a condition is edited, even after the file has been switched', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('Continue')).toBeInTheDocument());
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(1));
        await act(() => {
            userEvent.click(screen.queryByText('Continue'));
        });
        await waitFor(() =>  expect(screen.getByText('Save changes?')).toBeInTheDocument());
        const alertButton = screen.getAllByText('Continue')[1];
        await act(() => {
            userEvent.click(alertButton);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(1));
        const button3 = screen.getByText('lname2.fname2.thesis');
        await act(() => {
            userEvent.click(button3);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(0));
        const button4 = screen.getByText('lname1.fname1.dissertation');
        await act(() => {
            userEvent.click(button4);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(1));
    });

    test('Should save changes when a condition is edited, even after the file has been switched', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(2));
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(1));
        await act(() => {
            userEvent.click(screen.queryByText('Continue'));
        });
        await waitFor(() =>  expect(screen.getByText('Save changes?')).toBeInTheDocument());
        const alertButton = screen.getAllByText('Continue')[1];
        await act(() => {
            userEvent.click(alertButton);
        });
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(1));
        const button3 = screen.getByText('lname2.fname2.thesis');
        await act(() => {
            userEvent.click(button3);
        });
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(1));
        const button4 = screen.getByText('lname1.fname1.dissertation');
        await act(() => {
            userEvent.click(button4);
        });
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(1));
    });

    test('Should remove edited when reset to original button is pressed', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(0));
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(1));
        const button3 = screen.getByText('Reset All Conditions');
        await act(() => {
            userEvent.click(button3);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(0));
    });

    test('Should reset conditions when reset to original button is pressed', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryAllByText('edited').length).toBe(0));
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(1));
        const button3 = screen.getByText('Reset All Conditions');
        await act(() => {
            userEvent.click(button3);
        });
        await waitFor(() =>  expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(2));
    });

    test('Should not open comment box on initial render', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument();
    });

    test('Should not open comment box on initial render when the comment button is pressed', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument());
    });

    test('Should open comment box when editing', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('lname1.fname1.dissertation')).not.toBeInTheDocument());
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
    });

    test('Should change comment in comment box when editing', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('lname1.fname1.dissertation')).not.toBeInTheDocument());
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
        const commentBox = screen.queryByLabelText('Comment')
        await act(() => {
            userEvent.type(commentBox, 'adding content')
        });
        await waitFor(() =>  expect(screen.queryByText('adding content')).toBeInTheDocument());
    });

    test('Should save comment after clicking another comment', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('lname1.fname1.dissertation')).not.toBeInTheDocument());
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
        const commentBox = screen.queryByLabelText('Comment')
        await act(() => {
            userEvent.type(commentBox, 'adding content')
        });
        await waitFor(() =>  expect(screen.queryByText('adding content')).toBeInTheDocument());
        await act(() => {
            userEvent.click(commentButtons[1]);
        });
        await waitFor(() =>  expect(screen.queryByText('adding content')).not.toBeInTheDocument());
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByText('adding content')).toBeInTheDocument());
    });

    test('Should save comment after another file is switched to', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('lname1.fname1.dissertation')).not.toBeInTheDocument());
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
        const commentBox = screen.queryByLabelText('Comment')
        await act(() => {
            userEvent.type(commentBox, 'adding content')
        });
        await waitFor(() =>  expect(screen.queryByText('adding content')).toBeInTheDocument());
        await act(() => {
            userEvent.click(screen.queryByText('Continue'));
        });
        await waitFor(() =>  expect(screen.getByText('Save changes?')).toBeInTheDocument());
        const alertButton = screen.getAllByText('Continue')[1];
        await act(() => {
            userEvent.click(alertButton);
        });
        await waitFor(() =>  expect(screen.getByText('lname2.fname2.thesis')).toBeInTheDocument());
        const button3 = screen.getByText('lname2.fname2.thesis');
        await act(() => {
            userEvent.click(button3);
        });
        const button4 = screen.getByText('lname1.fname1.dissertation');
        await act(() => {
            userEvent.click(button4);
        });
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByText('adding content')).toBeInTheDocument());
    });

    test('Should not have comment boxes open when a file is switched', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('lname1.fname1.dissertation')).not.toBeInTheDocument());
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
        const commentBox = screen.queryByLabelText('Comment')
        await act(() => {
            userEvent.type(commentBox, 'adding content')
        });
        await waitFor(() =>  expect(screen.queryByText('adding content')).toBeInTheDocument());
        await act(() => {
            userEvent.click(screen.queryByText('Continue'));
        });
        await waitFor(() =>  expect(screen.getByText('Save changes?')).toBeInTheDocument());
        const alertButton = screen.getAllByText('Continue')[1];
        await act(() => {
            userEvent.click(alertButton);
        });
        await waitFor(() =>  expect(screen.getByText('lname2.fname2.thesis')).toBeInTheDocument());
        const button3 = screen.getByText('lname2.fname2.thesis');
        await act(() => {
            userEvent.click(button3);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument());
    });

    test('Should be able to view comment box that has a comment after editing', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('lname1.fname1.dissertation')).not.toBeInTheDocument());
        const commentButtons = screen.getAllByTestId('comment-button');
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
        const commentBox = screen.queryByLabelText('Comment');
        await act(() => {
            userEvent.type(commentBox, 'adding content');
        });
        await waitFor(() =>  expect(screen.queryByText('adding content')).toBeInTheDocument());
        await act(() => {
            userEvent.click(screen.queryByText('Continue'));
        });
        await waitFor(() =>  expect(screen.getByText('Save changes?')).toBeInTheDocument());
        const alertButton = screen.getAllByText('Continue')[1];
        await act(() => {
            userEvent.click(alertButton);
        });
        await waitFor(() =>  expect(screen.getByText('lname2.fname2.thesis')).toBeInTheDocument());
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
    });

    test('Should not be able to edit comment box that has a comment after editing', async () => {
        render(<Inspect setPage={jest.fn()} uploadedFiles={[{name: 'file1.pdf'}, {name: 'file2.pdf'}, {name: 'file3.pdf'}]} setUploadedFiles={jest.fn()} requirementsList={pdfRequirementsMet.files} />);
        const button1 = screen.getByText('Edit/ View Selected File');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText('lname1.fname1.dissertation')).not.toBeInTheDocument());
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });   
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
        const commentBox = screen.queryByLabelText('Comment')
        await act(() => {
            userEvent.type(commentBox, 'adding content')
        });
        await waitFor(() =>  expect(screen.queryByText('adding content')).toBeInTheDocument());
        await act(() => {
            userEvent.click(screen.queryByText('Continue'));
        });
        await waitFor(() =>  expect(screen.getByText('Save changes?')).toBeInTheDocument());
        const alertButton = screen.getAllByText('Continue')[1];
        await act(() => {
            userEvent.click(alertButton);
        });
        await waitFor(() =>  expect(screen.getByText('lname2.fname2.thesis')).toBeInTheDocument());
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
        await act(() => {
            userEvent.type(commentBox, 'adding new content')
        });
        await waitFor(() =>  expect(screen.queryByText('adding new content')).not.toBeInTheDocument());
    });

})
