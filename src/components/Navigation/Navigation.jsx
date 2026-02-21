import React from 'react';
import styles from './Navigation.module.css';


const Navigation = () => {
    return (
        <div className={styles.navigation}>
            Awesome Kanban Board
            <img className={styles.img_auth} src={"/images/user-avatar.svg"} alt="Аватар пользователя" />
        </div> )
};

export default Navigation;