import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    test('renders active and finished tasks', () => {
        render(<Footer activeTasks={5} finishedTasks={3} />);

        expect(screen.getByText('Active tasks:')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('Finished tasks:')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('renders copyright with author name', () => {
        render(<Footer activeTasks={0} finishedTasks={0} />);

        expect(screen.getByText(/Kanban board by leroyspb/)).toBeInTheDocument();
    });
});