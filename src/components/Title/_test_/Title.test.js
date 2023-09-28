import React from "react";
import { render, screen } from '@testing-library/react';
import Title from '../Title';

describe('Title', () => {
    test('renders title', () => {
        render(<Title />);
        const element = screen.getByText(/Verify Electronic Theses & Dissertations Format/i);
        expect(element).toBeInTheDocument();
    });
})
