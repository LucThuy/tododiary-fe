import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare, faBook } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <div className={cx('container', 'rounded')}>
            <div className={cx('top-section')}>
                <button className={cx('rounded')}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <span>Ca nhan</span>
            </div>
            <ul className={cx('link-list')}>
                <li className={cx('rounded')}>
                    <Link to="/todaytodo">
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <span>Today Todo</span>
                    </Link>
                </li>
                <li className={cx('rounded')}>
                    <Link to="/diaryhistory">
                        <FontAwesomeIcon icon={faBook} />
                        <span>Diary History</span>
                    </Link>
                </li>
            </ul>
            <div>Tao</div>
        </div>
    );
}

export default SideBar;
