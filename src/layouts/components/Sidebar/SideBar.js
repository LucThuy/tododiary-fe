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
import { useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const [activeSidebar, setActiveSidebar] = useState(true);

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
                <Link to="/profile">
                    <img
                        src="https://cdn.lazi.vn/storage/uploads/users/cover/548014_1614328231.jpg"
                        alt="avatar"
                        className={cx('avatar', 'rounded', {
                            active: activeSidebar,
                        })}
                    />
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
