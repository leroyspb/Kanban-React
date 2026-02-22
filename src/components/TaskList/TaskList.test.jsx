import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

// Мокаем дочерний компонент
jest.mock('../TaskItem/TaskItem', () => {
    return function MockTaskItem({ task }) {
        return <div data-testid="mock-task-item">{task.title}</div>;
    };
});

describe('TaskList', () => {
    const mockTasks = [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' }
    ];

    test('renders list of tasks', () => {
        render(<TaskList tasks={mockTasks} />);

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    test('shows empty message when no tasks', () => {
        render(<TaskList tasks={[]} />);

        expect(screen.getByText('No tasks')).toBeInTheDocument();
    });
});