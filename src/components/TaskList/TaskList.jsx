import React from 'react';
import styles from './TaskList.module.css';
import TaskItem from '../TaskItem/TaskItem';

const TaskList = ({ tasks }) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div className={styles.emptyList}>
                <p className={styles.emptyMessage}>No tasks</p>
            </div>
        );
    }

    return (
        <div className={styles.taskList}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
};

export default TaskList;