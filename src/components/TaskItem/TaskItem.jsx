import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TaskItem.module.css';
import { FaTrash } from 'react-icons/fa';
import useBoardStore from '../../store/boardStore';

const TaskItem = ({ task }) => {
    const navigate = useNavigate();
    const { deleteTask } = useBoardStore();

    const handleView = () => {
        navigate(`/tasks/${task.id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation(); // Останавливаем всплытие события, чтобы не открывалась карточка
        if (window.confirm('Удалить задачу?')) {
            deleteTask(task.id);
        }
    };

    return (
        <div
            className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
            onClick={handleView}
        >
            <span className={styles.taskTitle}>{task.title}</span>
            <button
                className={styles.deleteButton}
                onClick={handleDelete}
                title="Удалить задачу"
            >
                <FaTrash size={14} />
            </button>
        </div>
    );
};

export default TaskItem;