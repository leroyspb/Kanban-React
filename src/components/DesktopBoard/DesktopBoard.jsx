import React from 'react';
import styles from './DesktopBoard.module.css';
import Column from '../Column/Column';
import Footer from '../Footer/Footer';
import TaskModal from '../TaskModal/TaskModal';
import useBoardStore from '../../store/boardStore';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const DesktopBoard = () => {
    const { columns, moveTask, moveColumn } = useBoardStore();

    const activeTasks = columns.reduce((acc, col) =>
        col.id !== 'finished' ? acc + col.tasks.length : acc, 0
    );

    const finishedTasks = columns.find(col => col.id === 'finished')?.tasks.length || 0;

    const handleDragEnd = (result) => {
        const { destination, source, type } = result;

        if (!destination) return;

        if (type === 'column') {
            moveColumn(source.index, destination.index);
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            moveTask(
                result.draggableId,
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index
            );
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className={styles.board}>
                    <header className={styles.header}>
                        <h1>Awesome Kanban Board</h1>
                    </header>

                    <Droppable
                        droppableId="all-columns"
                        direction="horizontal"
                        type="column"
                    >
                        {(provided) => (
                            <div
                                className={styles.columnsContainer}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {columns.map((column, index) => (
                                    <Column
                                        key={column.id}
                                        column={column}
                                        index={index}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Footer
                        activeTasks={activeTasks}
                        finishedTasks={finishedTasks}
                    />
                </div>
            </DragDropContext>

            <TaskModal />
        </>
    );
};

export default DesktopBoard;