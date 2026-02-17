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
      <span className={styles.dragHandle}>
        <FaGripVertical size={14} />
      </span>

            <span className={styles.taskTitle}>{task.title}</span>

            {task.priority && (
                <span className={`${styles.priority} ${styles[task.priority]}`}>
          {task.priority === 'high' && '🔥'}
                    {task.priority === 'medium' && '⚡'}
                    {task.priority === 'low' && '⏳'}
                    {task.priority === 'critical' && '‼️'}
        </span>
            )}

            <div className={styles.taskActions}>
                <button
                    className={styles.iconButton}
                    onClick={handleView}
                    title="Просмотр"
                >
                    <FaEye size={14} />
                </button>
                <button
                    className={styles.iconButton}
                    onClick={handleEdit}
                    title="Редактировать"
                >
                    <FaEdit size={14} />
                </button>
                <button
                    className={styles.iconButton}
                    onClick={handleDelete}
                    title="Удалить"
                >
                    <FaTrash size={14} />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;