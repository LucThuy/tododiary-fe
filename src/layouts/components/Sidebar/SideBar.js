import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faPenToSquare,
    faBook,
    faUser,
    faStore,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Sidebar() {
    const [activeSidebar, setActiveSidebar] = useState(true);

    const [userName, setUserName] = useState('guest');
    const [userAvatar, setUserAvatar] = useState(
        process.env.PUBLIC_URL + '/default-avatar.png'
    );

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        axios
            .get('http://localhost:8080/api/main/user', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setUserName(res.data.name);
                setUserAvatar('http://localhost:8080/' + res.data.avatar);
            });
    }, []);

    return (
        <div className={cx('container', 'rounded', { active: activeSidebar })}>
            <div className={cx('section')}>
                <button
                    onClick={() => {
                        setActiveSidebar(!activeSidebar);
                    }}
                    className={cx('rounded', 'switch')}
                >
                    <FontAwesomeIcon icon={faBars} className={cx('icon')} />
                </button>
                <Link to="/profile" className={cx('user-detail')}>
                    <img
                        src={userAvatar}
                        alt="avatar"
                        className={cx('user-avatar', 'rounded', {
                            active: activeSidebar,
                        })}
                    />
                    <span
                        className={cx('user-name', {
                            active: activeSidebar,
                        })}
                    >
                        {userName}
                    </span>
                </Link>
                <div className={cx('rounded', 'link')}>
                    <Link to="/profile" className={cx('link-item')}>
                        <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                        <span>Profile</span>
                    </Link>
                </div>
            </div>
            <div className={cx('section')}>
                <ul>
                    <li className={cx('rounded', 'link')}>
                        <Link to="/todaytodo" className={cx('link-item')}>
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className={cx('icon')}
                            />
                            <span>Today Todo</span>
                        </Link>
                    </li>
                    <li className={cx('rounded', 'link')}>
                        <Link to="/diaryhistory" className={cx('link-item')}>
                            <FontAwesomeIcon
                                icon={faBook}
                                className={cx('icon')}
                            />
                            <span>Diary History</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={cx('section', 'bottom')}>
                <div className={cx('rounded', 'link')}>
                    <Link to="/smallstore" className={cx('link-item')}>
                        <FontAwesomeIcon
                            icon={faStore}
                            className={cx('icon')}
                        />
                        <span>Small Store</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
