import React from "react";
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
    test('renders script a logo', () => {
        render(<Header />);
        const element = screen.getByAltText('Script A Logo');
        expect(element).toBeInTheDocument();
    });

    test('renders nameplate logo', () => {
        render(<Header />);
        const element = screen.getByAltText('Nameplate Logo');
        expect(element).toBeInTheDocument();
    });
})
