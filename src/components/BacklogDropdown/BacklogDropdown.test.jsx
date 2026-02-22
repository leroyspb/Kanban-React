import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BacklogDropdown from './BacklogDropdown';

describe('BacklogDropdown', () => {
    const mockTasks = [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' }
    ];
    const mockOnSelect = jest.fn();
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders dropdown with tasks', () => {
        render(
            <BacklogDropdown
                tasks={mockTasks}
                onSelect={mockOnSelect}
                onClose={mockOnClose}
            />
        );

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    test('shows empty message when no tasks', () => {
        render(
            <BacklogDropdown
                tasks={[]}
                onSelect={mockOnSelect}
                onClose={mockOnClose}
            />
        );

        expect(screen.getByText('No tasks available')).toBeInTheDocument();
    });

    test('calls onSelect when task clicked', () => {
        render(
            <BacklogDropdown
                tasks={mockTasks}
                onSelect={mockOnSelect}
                onClose={mockOnClose}
            />
        );

        fireEvent.click(screen.getByText('Task 1'));
        expect(mockOnSelect).toHaveBeenCalledWith('1');
    });

    test('calls onClose when close button clicked', () => {
        render(
            <BacklogDropdown
                tasks={mockTasks}
                onSelect={mockOnSelect}
                onClose={mockOnClose}
            />
        );

        const closeButton = document.querySelector('.closeButton');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
    });
});