import { render, screen } from '@testing-library/react';
import Confirm from '../Confirm';

describe('Confirm', () => {
    test('renders Confirm title', () => {
        render(<Confirm />);
        const linkElement = screen.getByText(/Confirm/i);
        expect(linkElement).toBeInTheDocument();
    });
})