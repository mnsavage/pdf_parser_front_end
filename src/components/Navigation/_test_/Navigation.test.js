import { render, screen } from '@testing-library/react';
import Navigation from '../Navigation';

describe('Navigation', () => {
    test('renders Upload link', () => {
        render(<Navigation />);
        const linkElement = screen.getByText(/Upload/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('renders Confirm link', () => {
        render(<Navigation />);
        const linkElement = screen.getByText(/Confirm/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('renders Inspect link', () => {
        render(<Navigation />);
        const linkElement = screen.getByText(/Inspect/i);
        expect(linkElement).toBeInTheDocument();
    });
})
