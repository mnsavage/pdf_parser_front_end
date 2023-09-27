import { render, screen } from '@testing-library/react';
import Upload from '../Upload';

describe('Upload', () => {
    test('renders NoPage title', () => {
        render(<Upload />);
        const element = screen.getByText(/Upload/i);
        expect(element).toBeInTheDocument();
    });
})
