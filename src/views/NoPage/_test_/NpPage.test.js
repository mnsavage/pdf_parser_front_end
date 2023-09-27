import { render, screen } from '@testing-library/react';
import NoPage from '../NoPage';

describe('NoPage', () => {
    test('renders NoPage title', () => {
        render(<NoPage />);
        const element = screen.getByText(/404/i);
        expect(element).toBeInTheDocument();
    });
})
