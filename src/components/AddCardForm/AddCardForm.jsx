import React, { useState } from 'react';
import styles from './AddCardForm.module.css';
import useBoardStore from '../../store/boardStore';

const AddCardForm = ({ columnId, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const { addTask } = useBoardStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            addTask(columnId, title);
            setTitle('');
            onSave();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
        if (e.key === 'Escape') {
            onCancel();
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter task title..."
                className={styles.input}
                autoFocus
            />
            <div className={styles.actions}>
                <button
                    type="submit"
                    className={styles.saveButton}
                    disabled={!title.trim()}
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className={styles.cancelButton}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

console.log('Данные из localStorage:', localStorage.getItem('kanban-board-storage'));

export default AddCardForm;