import React from 'react';
import styles from './TaskModal.module.css';
import { FaTimes, FaCalendar, FaFlag } from 'react-icons/fa';
import useBoardStore from '../../store/boardStore';
import useUIStore from '../../store/uiStore';

const TaskModal = () => {
    const { selectedTask, isModalOpen, closeTaskModal } = useUIStore();
    const { columns, deleteTask } = useBoardStore();

    if (!isModalOpen || !selectedTask) return null;

    const column = columns.find(col =>
        col.tasks.some(t => t.id === selectedTask.id)
    );

    const priorityText = {
        high: 'Высокий',
        medium: 'Средний',
        low: 'Низкий',
        critical: 'Критический'
    }[selectedTask.priority] || 'Средний';

    const statusText = {
        backlog: 'Бэклог',
        ready: 'Готово',
        inProgress: 'В работе',
        finished: 'Завершено'
    }[column?.id] || 'Неизвестно';

    const handleDelete = () => {
        if (window.confirm('Удалить задачу?')) {
            deleteTask(selectedTask.id);
            closeTaskModal();
        }
    };

    return (
        <div className={styles.overlay} onClick={closeTaskModal}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeTaskModal}>
                    <FaTimes />
                </button>

                <div className={styles.modalContent}>
                    <h2 className={styles.taskTitle}>{selectedTask.title}</h2>

                    <div className={styles.metadata}>
                        {selectedTask.priority && (
                            <div className={styles.metaItem}>
                                <FaFlag className={styles.metaIcon} />
                                <span className={styles.metaLabel}>Приоритет:</span>
                                <span className={`${styles.priority} ${styles[selectedTask.priority]}`}>
                  {priorityText}
                </span>
                            </div>
                        )}

                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Статус:</span>
                            <span className={styles.status}>{statusText}</span>
                        </div>

                        {selectedTask.createdAt && (
                            <div className={styles.metaItem}>
                                <FaCalendar className={styles.metaIcon} />
                                <span className={styles.metaLabel}>Создана:</span>
                                <span>{new Date(selectedTask.createdAt).toLocaleDateString('ru-RU')}</span>
                            </div>
                        )}
                    </div>

                    <div className={styles.description}>
                        <h3 className={styles.descriptionTitle}>Описание</h3>
                        <p className={styles.descriptionText}>
                            {selectedTask.description || 'Нет описания'}
                        </p>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button
                        className={styles.editButton}
                        onClick={() => console.log('Edit task:', selectedTask.id)}
                    >
                        Редактировать
                    </button>
                    <button
                        className={styles.deleteButton}
                        onClick={handleDelete}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;