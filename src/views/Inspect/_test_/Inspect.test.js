import React from "react";
import { render, screen } from '@testing-library/react';
import Inspect from '../Inspect';

describe('Inspect', () => {
    test('renders Inspect title', () => {
        render(<Inspect />);
        const element = screen.getByText(/Inspect/i);
        expect(element).toBeInTheDocument();
    });
})
