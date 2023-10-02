import React from 'react';
import { render, screen } from '@testing-library/react';
import UnderlineHeader from '../UnderlineHeader';

describe('UnderlineHeader', () => {
    test('renders UnderlineHeader', () => {
        render(<UnderlineHeader title={'title'}/>);
        const header = screen.getByText('title');
        expect(header).toBeInTheDocument();
    });
})
