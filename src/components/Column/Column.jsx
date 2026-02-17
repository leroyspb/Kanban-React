import React, { useState } from 'react';
import styles from './Column.module.css';
import TaskList from '../TaskList/TaskList';
import AddCardForm from '../AddCardForm/AddCardForm';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Column = ({ column, index }) => {
    const [isAdding, setIsAdding] = useState(false);

    const columnIcons = {
        backlog: '📋',
        ready: '🎯',
        inProgress: '⚙️',
        finished: '✅'
    };

    const columnColors = {
        backlog: '#ff6b6b',
        ready: '#4ecdc4',
        inProgress: '#45b7d1',
        finished: '#96ceb4'
    };

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`${styles.column} ${snapshot.isDragging ? styles.dragging : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div
                        className={styles.columnHeader}
                        style={{ borderBottomColor: columnColors[column.id] }}
                    >
            <span className={styles.columnIcon}>
              {columnIcons[column.id]}
            </span>
                        <h3 className={styles.columnTitle}>
                            {column.title}
                        </h3>
                        <span className={styles.taskCount}>
              {column.tasks.length}
            </span>
                        <div
                            className={styles.dragHandle}
                            {...provided.dragHandleProps}
                            title="Перетащить колонку"
                        >
                            ⋮⋮
                        </div>
                    </div>

                    <Droppable droppableId={column.id} type="task">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={styles.tasksContainer}
                            >
                                <TaskList tasks={column.tasks} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {isAdding ? (
                        <AddCardForm
                            columnId={column.id}
                            onSave={() => setIsAdding(false)}
                            onCancel={() => setIsAdding(false)}
                        />
                    ) : (
                        <button
                            className={styles.addButton}
                            onClick={() => setIsAdding(true)}
                        >
                            + Add card
                        </button>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default Column;