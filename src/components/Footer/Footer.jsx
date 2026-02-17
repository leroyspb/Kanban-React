import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ activeTasks, finishedTasks }) => {
    const currentYear = new Date().getFullYear();
    const authorName = "Your Name";

    return (
        <footer className={styles.footer}>
            <div className={styles.stats}>
        <span className={styles.statItem}>
          <span className={styles.statLabel}>Active tasks:</span>
          <span className={styles.statValue}>{activeTasks}</span>
        </span>

                <span className={styles.divider}>•</span>

                <span className={styles.statItem}>
          <span className={styles.statLabel}>Finished tasks:</span>
          <span className={styles.statValue}>{finishedTasks}</span>
        </span>
            </div>

            <div className={styles.copyright}>
                Kanban board by <span className={styles.author}>{authorName}</span>, {currentYear}
            </div>
        </footer>
    );
};

export default Footer;