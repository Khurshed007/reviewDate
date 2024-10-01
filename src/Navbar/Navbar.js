import React, { useEffect, useState } from 'react';
import styles from "./Navbar.module.css";
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../store/selectors';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const currentUser = useSelector(getCurrentUser);
    const [alertShown, setAlertShown] = useState(false); // Состояние для контроля отображения alert

    useEffect(() => {
        if (currentUser.isAdmin && !alertShown) {
            alert("У вас есть право удалять пользователей, кроме себя, так как вы Админ.");
            setAlertShown(true); // Установить состояние, чтобы не показывать alert снова
        }
    }, [alertShown]); // Зависимости useEffect
    
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Логотип</div>
            <p className={styles.greeting}>Здравствуйте, {currentUser.displayName}!</p>

            <Link to={"/"}>
                <button className={styles.navButton}>
                    Выход
                </button>
            </Link>
        </nav>
    );
};

export default Navbar;