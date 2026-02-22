import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';

describe('Navigation', () => {
    test('renders title', () => {
        render(<Navigation />);
        expect(screen.getByText('Awesome Kanban Board')).toBeInTheDocument();
    });

    test('renders user avatar', () => {
        render(<Navigation />);
        const avatar = screen.getByAltText('Аватар пользователя');
        expect(avatar).toBeInTheDocument();
    });

    test('opens menu when chevron clicked', () => {
        render(<Navigation />);

        const chevronButton = document.querySelector('.chevronButton');
        fireEvent.click(chevronButton);

        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Log Out')).toBeInTheDocument();
    });
});