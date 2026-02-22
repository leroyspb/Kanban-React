import React from 'react';
import { render, screen } from '@testing-library/react';
import Column from './Column';

// Мокаем сложные зависимости
jest.mock('react-beautiful-dnd', () => ({
    Droppable: ({ children }) => children({
        innerRef: jest.fn(),
        droppableProps: {},
        placeholder: null
    }, {})
}));

jest.mock('../../store/boardStore', () => ({
    __esModule: true,
    default: () => ({
        columns: [],
        moveFromBacklogToReady: jest.fn(),
        moveFromReadyToInProgress: jest.fn(),
        moveFromInProgressToFinished: jest.fn()
    })
}));

// Мокаем дочерние компоненты
jest.mock('../TaskList/TaskList', () => () => <div>TaskList</div>);
jest.mock('../AddCardForm/AddCardForm', () => () => <div>AddCardForm</div>);
jest.mock('../BacklogDropdown/BacklogDropdown', () => () => <div>BacklogDropdown</div>);

describe('Column', () => {
    const mockColumn = {
        id: 'backlog',
        title: 'Backlog',
        tasks: []
    };

    test('renders column title', () => {
        render(<Column column={mockColumn} />);
        expect(screen.getByText('Backlog')).toBeInTheDocument();
    });

    test('renders add button', () => {
        render(<Column column={mockColumn} />);
        expect(screen.getByText('Add card')).toBeInTheDocument();
    });
});