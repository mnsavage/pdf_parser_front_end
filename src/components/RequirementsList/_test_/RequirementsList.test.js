import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import RequirementsList from '../RequirementsList';
import RequirementsListMocks from './mocks';

describe('RequirementsList', () => {
    test('Renders headers', () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}} 
            />
        );
        const element1 = screen.getByText('Page Formatting & Font');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('Page Order & Section Formatting');
        expect(element2).toBeInTheDocument();
    });

    test('Renders requirements', () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}
            />
        );
        const element1 = screen.getByText('Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('No Blank pages in the documents');
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText('2 double spaces beneath title');
        expect(element3).toBeInTheDocument();
    });

    test('Renders comment buttons', () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}
            />
        );
        const commentButtons = screen.getAllByTestId('comment-button');
        expect(commentButtons.length).toBe(3);
    });

    test('Renders comment box when comment button is clicked', async () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}} 
            />
        );
        expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument();
        const commentButtons = screen.getAllByTestId('comment-button');
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
    });

    test('Should not render comment box when list is initialized', async () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}
            />
        );
        expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument();
    });

    test('Should not render comment box when comment button is clicked when disabled and no comment is initialized', async () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={true} 
                filterFunction={() => (value, metConditions) => {return value}} 
            />
        );
        expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument();
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument());
    });

    test('Should render comment box when comment button is clicked when disabled and comment is initialized', async () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsEdited}
                setComments={jest.fn()}
                error={false}
                disabled={true} 
                filterFunction={() => (value, metConditions) => {return value}}
            />
        );
        expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument();
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
    });

    test('Should render the comment in the comment box when comment button is clicked when disabled and comment is initialized', async () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsEdited}
                setComments={jest.fn()}
                error={false}
                disabled={true} 
                filterFunction={() => (value, metConditions) => {return value}}
            />
        );
        expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument();
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByText('Mock comment 1')).toBeInTheDocument());
    });

    test('Should render the comment in the comment box when comment button is clicked when not disabled and comment is initialized', async () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsEdited}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}
            />
        );
        expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument();
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByText('Mock comment 1')).toBeInTheDocument());
    });

    test('Should render the comment box when comment button is clicked when disabled and comment is not initialized', async () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}
            />
        );
        expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument();
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
    });

    test('Should render only 1 comment box at a time', async () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}
            />
        );
        expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument();
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryAllByLabelText('Comment').length).toBe(1));
        await act(() => {
            userEvent.click(commentButtons[1]);
        });
        await waitFor(() =>  expect(screen.queryAllByLabelText('Comment').length).toBe(1));
    });

    test('Should close comment box if the same comment icon is pressed', async () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}} 
            />
        );
        expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument();
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).not.toBeInTheDocument());
    });

    test('Should not edit the comment in the comment box when disabled', async () => {
        const setComments = jest.fn()
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsEdited}
                setComments={setComments}
                error={false}
                disabled={true} 
                filterFunction={() => (value, metConditions) => {return value}} 
            />
        );
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        const commentBox = screen.queryByLabelText('Comment')
        await waitFor(() =>  expect(screen.queryByText('Mock comment 1')).toBeInTheDocument());
        await act(() => {
            userEvent.type(commentBox, 'adding content')
        });
        await waitFor(() =>  expect(setComments).not.toHaveBeenCalled());
    });

    test('Should edit the comment in the comment box when not disabled', async () => {
        const setComments = jest.fn()
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsEdited}
                setComments={setComments}
                error={false}
                disabled={true} 
                filterFunction={() => (value, metConditions) => {return value}} 
            />
        );
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByText('Mock comment 1')).toBeInTheDocument());
        const commentBox = screen.queryByLabelText('Comment')
        await act(() => {
            userEvent.type(commentBox, 'adding content')
        });
        await waitFor(() =>  expect(setComments).not.toHaveBeenCalled());
    });

    test('Should edit the comment in the comment box when not disabled and no comment initialized', async () => {
        const setComments = jest.fn()
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsEdited}
                setComments={setComments}
                error={false}
                disabled={true} 
                filterFunction={() => (value, metConditions) => {return value}}  
            />
        );
        const commentButtons = screen.getAllByTestId('comment-button')
        await act(() => {
            userEvent.click(commentButtons[0]);
        });
        await waitFor(() =>  expect(screen.queryByLabelText('Comment')).toBeInTheDocument());
        const commentBox = screen.getByLabelText('Comment')
        await act(() => {
            userEvent.keyboard('adding content')
        });
        await waitFor(() =>  expect(setComments).not.toHaveBeenCalled());
    });

    test('When a header is collapsed, the requirements are hidden', async () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}} 
            />
        );
        const textElement1 = 'Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs';
        const textElement2 = '2 double spaces beneath title';
        expect(screen.queryByText(textElement1)).toBeInTheDocument();
        expect(screen.queryByText(textElement2)).toBeInTheDocument();
        const button1 = screen.getByText('Page Formatting & Font');
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText(textElement1)).not.toBeInTheDocument());
        expect(screen.queryByText(textElement2)).toBeInTheDocument();
        await act(() => {
            userEvent.click(button1);
        });
        await waitFor(() =>  expect(screen.queryByText(textElement1)).toBeInTheDocument());
        expect(screen.queryByText(textElement2)).toBeInTheDocument();
    });

    test('Checkboxes are correctly initialized on render', () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}  
            />
        );
        const elements = screen.getAllByTestId('CheckBoxIcon');
        expect(elements.length).toBe(2);
    });

    test('Checkboxes can be changed when they are not disabled', async () => {
        const setMetConditions = jest.fn();
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={setMetConditions}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}  
            />
        );
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        expect(setMetConditions).toHaveBeenCalled();
    });

    test('Checkboxes can not be changed when they are disabled', async () => {
        const setMetConditions = jest.fn();
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={setMetConditions}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={true} 
                filterFunction={() => (value, metConditions) => {return value}} 
            />
        );
        const buttons = screen.getAllByTestId('checkbox');
        await act(() => {
            userEvent.click(buttons[0]);
        });
        expect(setMetConditions).not.toHaveBeenCalled();
    });

    test('Should filter conditions based on the filterFunction', () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={(value, metConditions) => {return (metConditions[value['title']]['met'])}}  
            />
        );
        const element1 = screen.queryByText('Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs');
        expect(element1).toBeInTheDocument();
        const element2 = screen.queryByText('No Blank pages in the documents');
        expect(element2).not.toBeInTheDocument();
        const element3 = screen.queryByText('2 double spaces beneath title');
        expect(element3).toBeInTheDocument();
    });

    test('When showUnmet is false, only all conditions are shown', () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}} 
            />
        );
        const element1 = screen.getByText('Font: Use a standard 12-point font consistently throughout the document, including headings and subheadings, and must be black font including URLs');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('No Blank pages in the documents');
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText('2 double spaces beneath title');
        expect(element3).toBeInTheDocument();
    });

    test('Should not show edited on requirement if it is not edited', () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}  
            />
        );
        const element = screen.queryAllByText('edited');
        expect(element.length).toBe(0);
    });

    test('Should show edited on requirement if it is edited', () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsEdited}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}   
            />
        );
        const element = screen.queryAllByText('edited');
        expect(element.length).toBe(2);
    });

    test('Should show loading symbol when supplied null', () => {
        render(
            <RequirementsList 
                requirementsList={null} 
                metConditions={null}
                setMetConditions={jest.fn()}
                comments={null}
                setComments={jest.fn()}
                error={false}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}  
            />
        );
        const element = screen.queryByTestId('loading-spinner');
        expect(element).toBeInTheDocument();
    });

    test('Renders error icon and message on error', () => {
        render(
            <RequirementsList 
                requirementsList={RequirementsListMocks.pdfRequirementsMet} 
                metConditions={RequirementsListMocks.metConditionsInitial}
                setMetConditions={jest.fn()}
                comments={RequirementsListMocks.commentsInitial}
                setComments={jest.fn()}
                error={true}
                disabled={false} 
                filterFunction={() => (value, metConditions) => {return value}}  
            />
        );
        const element1 = screen.getByTestId('error-icon');
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText('Error Fetching Requirements');
        expect(element2).toBeInTheDocument();
    });


})