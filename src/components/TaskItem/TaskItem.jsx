import React from 'react';
import styles from './TaskItem.module.css';
import { FaGripVertical, FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import useBoardStore from '../../store/boardStore';
import useUIStore from '../../store/uiStore';

const TaskItem = ({ task }) => {
    const { deleteTask } = useBoardStore();
    const { openTaskModal } = useUIStore();

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Удалить задачу?')) {
            deleteTask(task.id);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        console.log('Edit task:', task.id);
    };

    const handleView = () => {
        openTaskModal(task);
    };

    return (
        <div
            className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
            onClick={handleView}
        >

            <span className={styles.taskTitle}>{task.title}</span>
        </div>
    );
};

export default TaskItem;