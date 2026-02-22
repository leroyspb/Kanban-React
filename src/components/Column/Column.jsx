import React, { useState, useMemo } from 'react';
import styles from './Column.module.css';
import TaskList from '../TaskList/TaskList';
import AddCardForm from '../AddCardForm/AddCardForm';
import BacklogDropdown from '../BacklogDropdown/BacklogDropdown';
import { Droppable } from 'react-beautiful-dnd';
import useBoardStore from '../../store/boardStore';

const Column = ({ column }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { columns,
        moveFromBacklogToReady,
        moveFromReadyToInProgress,
        moveFromInProgressToFinished
    } = useBoardStore();

    // Определяем источник задач для текущей колонки
    const getSourceTasks = () => {
        switch(column.id) {
            case 'ready':
                // Получаем все задачи из Backlog
                const backlogTasks = columns.find(col => col.id === 'backlog')?.tasks || [];
                console.log('Backlog tasks for Ready:', backlogTasks); // Проверка
                return backlogTasks;
            case 'inProgress':
                return columns.find(col => col.id === 'ready')?.tasks || [];
            case 'finished':
                return columns.find(col => col.id === 'inProgress')?.tasks || [];
            default:
                return [];
        }
    };

    // Определяем функцию перемещения для текущей колонки
    const getMoveFunction = () => {
        switch(column.id) {
            case 'ready':
                return moveFromBacklogToReady;
            case 'inProgress':
                return moveFromReadyToInProgress;
            case 'finished':
                return moveFromInProgressToFinished;
            default:
                return null;
        }
    };

    const sourceTasks = getSourceTasks();
    const isSourceEmpty = sourceTasks.length === 0;
    const moveFunction = getMoveFunction();

    // Обработчик клика по кнопке Add card
    const handleAddClick = () => {
        // Для Backlog открываем форму создания новой задачи
        if (column.id === 'backlog') {
            setIsAdding(true);
            return;
        }

        // Для остальных колонок открываем дропдаун, если есть задачи в источнике
        if (!isSourceEmpty && moveFunction) {
            console.log('Opening dropdown with tasks:', sourceTasks); // Проверка
            setShowDropdown(true);
        }
    };

    // Обработчик выбора задачи из дропдауна
    const handleSelectTask = (taskId) => {
        console.log('Selected task:', taskId); // Проверка
        if (moveFunction) {
            moveFunction(taskId);
            setShowDropdown(false);
        }
    };

    const handleCloseDropdown = () => {
        setShowDropdown(false);
    };

    return (
        <div className={styles.column}>
            <div className={styles.columnHeader}>
                <span className={styles.columnTitle}>
                    {column.title}
                </span>
            </div>

            <Droppable droppableId={column.id} type="task">
                {(provided) => (
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

            {/* Дропдаун с задачами из источника (для Ready, In Progress, Finished) */}
            {column.id !== 'backlog' && showDropdown && (
                <BacklogDropdown
                    tasks={sourceTasks}
                    onSelect={handleSelectTask}
                    onClose={handleCloseDropdown}
                    columnName={column.id}
                />
            )}

            {/* Форма создания новой задачи (только для Backlog) */}
            {column.id === 'backlog' && isAdding ? (
                <AddCardForm
                    columnId={column.id}
                    onSave={() => setIsAdding(false)}
                    onCancel={() => setIsAdding(false)}
                />
            ) : null}

            {/* Кнопка Add card для всех колонок */}
            {!showDropdown && !isAdding && (
                <button
                    className={`${styles.addButton} ${
                        column.id !== 'backlog' && isSourceEmpty ? styles.disabled : ''
                    }`}
                    onClick={handleAddClick}
                    disabled={column.id !== 'backlog' && isSourceEmpty}
                >
                    Add card
                </button>
            )}
        </div>
    );
};

export default Column;