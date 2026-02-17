import React, { useState } from 'react';
import styles from './AddCardForm.module.css';
import useBoardStore from '../../store/boardStore';

const AddCardForm = ({ columnId, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const { addTask } = useBoardStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            addTask(columnId, title.trim());
            setTitle('');
            onSave();
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                className={styles.input}
                autoFocus
            />
            <div className={styles.actions}>
                <button type="submit" className={styles.saveButton}>
                    Add
                </button>
                <button type="button" onClick={onCancel} className={styles.cancelButton}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AddCardForm;