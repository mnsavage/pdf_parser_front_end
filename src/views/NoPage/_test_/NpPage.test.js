import { render, screen } from '@testing-library/react';
import NoPage from '../NoPage';

describe('NoPage', () => {
    test('renders NoPage title', () => {
        render(<NoPage />);
        const linkElement = screen.getByText(/404/i);
        expect(linkElement).toBeInTheDocument();
    });
})