import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddCardForm from './AddCardForm';

// Мокаем store
jest.mock('../../store/boardStore', () => ({
    __esModule: true,
    default: () => ({
        addTask: jest.fn()
    })
}));

describe('AddCardForm', () => {
    const mockOnSave = jest.fn();
    const mockOnCancel = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders form elements', () => {
        render(
            <AddCardForm
                columnId="backlog"
                onSave={mockOnSave}
                onCancel={mockOnCancel}
            />
        );

        expect(screen.getByPlaceholderText('Enter task title...')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    test('submit button is disabled when input is empty', () => {
        render(
            <AddCardForm
                columnId="backlog"
                onSave={mockOnSave}
                onCancel={mockOnCancel}
            />
        );

        const submitButton = screen.getByText('Submit');
        expect(submitButton).toBeDisabled();
    });

    test('calls onCancel when cancel button clicked', () => {
        render(
            <AddCardForm
                columnId="backlog"
                onSave={mockOnSave}
                onCancel={mockOnCancel}
            />
        );

        fireEvent.click(screen.getByText('Cancel'));
        expect(mockOnCancel).toHaveBeenCalled();
    });
});