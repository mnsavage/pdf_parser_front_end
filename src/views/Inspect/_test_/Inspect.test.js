import { render, screen } from '@testing-library/react';
import Inspect from '../Inspect';

describe('Inspect', () => {
    test('renders Inspect title', () => {
        render(<Inspect />);
        const linkElement = screen.getByText(/Inspect/i);
        expect(linkElement).toBeInTheDocument();
    });
})