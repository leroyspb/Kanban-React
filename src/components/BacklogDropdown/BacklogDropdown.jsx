import React from 'react';
import styles from './BacklogDropdown.module.css';

const BacklogDropdown = ({ tasks, onSelect, onClose}) => {
    // const getTitle = () => {
    //     switch(columnName) {
    //         case 'ready':
    //             return 'Select task from Backlog';
    //         case 'inProgress':
    //             return 'Select task from Ready';
    //         case 'finished':
    //             return 'Select task from In Progress';
    //         default:
    //             return 'Select task';
    //     }
    // };

    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownHeader}>
                {/*<span>{getTitle()}</span>*/}
                <button className={styles.closeButton} onClick={onClose}>✓</button>
            </div>
            <div className={styles.dropdownList}>
                {tasks.length === 0 ? (
                    <div className={styles.emptyMessage}>No tasks available</div>
                ) : (
                    tasks.map(task => (
                        <div
                            key={task.id}
                            className={styles.dropdownItem}
                            onClick={() => onSelect(task.id)}
                        >
                            {task.title}

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BacklogDropdown;