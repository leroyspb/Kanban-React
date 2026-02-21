import React from 'react';
import styles from './DesktopBoard.module.css';
import Column from '../Column/Column';
import Footer from '../Footer/Footer';
import TaskModal from '../TaskModal/TaskModal';
import useBoardStore from '../../store/boardStore';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {useState} from "react";
import {useEffect} from "react";
import Navigation from "../Navigation/Navigation";

const DesktopBoard = () => {
    const { columns, moveTask, moveColumn } = useBoardStore();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleClearStorage = () => {
        localStorage.removeItem('kanban-board-storage');
        window.location.reload(); // Перезагрузить страницу
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
    const activeTasks = columns.reduce((acc, col) =>
        col.id !== 'finished' ? acc + col.tasks.length : acc, 0
    );

    const finishedTasks = columns.find(col => col.id === 'finished')?.tasks.length || 0;

    const handleDragEnd = (result) => {
        const { destination, source, type } = result;

        if (!destination) return;

        if (type === 'column' && !isMobile) {
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
            <Navigation></Navigation>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className={styles.board}>

                    <Droppable
                        droppableId="all-columns"
                        direction={isMobile ? "vertical" : "horizontal"}
                        type="column"
                    >
                        {(provided) => (
                            <div
                                className={`${styles.columnsContainer} ${isMobile ? styles.mobile : ''}`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {columns.map((column, index) => (
                                    <Column
                                        key={column.id}
                                        column={column}
                                        index={index}
                                        isMobile={isMobile}
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