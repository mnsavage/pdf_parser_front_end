import { render, screen } from '@testing-library/react';
import Confirm from '../Confirm';

describe('Confirm', () => {
    test('renders Confirm title', () => {
        render(<Confirm />);
        const element = screen.getByText(/Confirm/i);
        expect(element).toBeInTheDocument();
    });
})
