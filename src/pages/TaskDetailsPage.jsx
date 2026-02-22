import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './TaskDetailsPage.module.css';
import useBoardStore from '../store/boardStore';
import { FaTimes, FaCheck } from 'react-icons/fa';
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";

const TaskDetailsPage = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const { columns, deleteTask, editTask } = useBoardStore(); // ← ВАЖНО: добавляем columns и editTask

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState('');

    // Вычисляем activeTasks и finishedTasks
    const activeTasks = columns.reduce((acc, col) =>
        col.id !== 'finished' ? acc + col.tasks.length : acc, 0
    );

    const finishedTasks = columns.find(col => col.id === 'finished')?.tasks.length || 0;

    // Ищем задачу по ID во всех колонках
    const findTask = () => {
        for (const col of columns) {
            const task = col.tasks.find(t => t.id === taskId);
            if (task) {
                return task;
            }
        }
        return null;
    };

    const task = findTask();

    if (!task) {
        return (
            <div className={styles.notFound}>
                <h2>Задача не найдена</h2>
                <button onClick={() => navigate('/')}>Вернуться на доску</button>
            </div>
        );
    }

    const startEditing = () => {
        setEditedDescription(task.description || '');
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditedDescription('');
    };

    const saveDescription = () => {
        editTask(task.id, { description: editedDescription });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm('Удалить задачу?')) {
            deleteTask(task.id);
            navigate('/');
        }
    };

    return (
        <>
            <Navigation />
            <div className={styles.page}>
                <div className={styles.container}>
                    {/* Крестик для закрытия в правом верхнем углу */}
                    <button className={styles.closeButton} onClick={() => navigate('/')}>
                        ╳
                    </button>

                    <div className={styles.taskCard}>
                        <h1 className={styles.taskTitle}>{task.title}</h1>

                        <div className={styles.descriptionSection}>
                            {isEditing ? (
                                <div className={styles.editContainer}>
                                    <textarea
                                        className={styles.descriptionTextarea}
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                        placeholder="Введите описание задачи..."
                                        autoFocus
                                    />
                                    <div className={styles.editActions}>
                                        <button className={styles.saveButton} onClick={saveDescription}>
                                            <FaCheck /> Сохранить
                                        </button>
                                        <button className={styles.cancelButton} onClick={cancelEditing}>
                                            <FaTimes /> Отмена
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={styles.descriptionContent}
                                    onClick={startEditing}
                                >
                                    <p className={task.description ? styles.descriptionText : styles.emptyDescription}>
                                        {task.description || 'У этой задачи нет описания'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                activeTasks={activeTasks}
                finishedTasks={finishedTasks}
            />
        </>
    );
};

export default TaskDetailsPage;