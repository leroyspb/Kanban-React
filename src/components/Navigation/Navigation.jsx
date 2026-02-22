import React, { useState } from 'react';
import styles from './Navigation.module.css';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        console.log('Logout clicked');
        setIsMenuOpen(false);
    };

    const handleProfile = () => {
        console.log('Profile clicked');
        setIsMenuOpen(false);
    };

    return (
        <div className={styles.navigation}>
            <span className={styles.title}>Awesome Kanban Board</span>

            <div className={styles.userSection}>
                <img
                    className={styles.img_auth}
                    src={"/images/user-avatar.svg"}
                    alt="Аватар пользователя"
                />

                <button
                    className={styles.chevronButton}
                    onClick={toggleMenu}
                >
                    <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={isMenuOpen ? styles.chevronUp : styles.chevronDown}
                    >
                        <path
                            d="M1 1L6 6L11 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                {isMenuOpen && (
                    <div className={styles.dropdownMenu}>
                        <button
                            className={styles.dropdownItem}
                            onClick={handleProfile}
                        >
                            Profile
                        </button>
                        <button
                            className={styles.dropdownItem}
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navigation;