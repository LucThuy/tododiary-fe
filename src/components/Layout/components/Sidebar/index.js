import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <div className={cx('container', 'rounded')}>
            <div>Ca nhan</div>
            <ul>
                <li>
                    <Link to="/todaytodo">Today Todo</Link>
                </li>
                <li>
                    <Link to="/diaryhistory">Diary History</Link>
                </li>
            </ul>
            <div>Tao</div>
        </div>
    );
}

export default SideBar;
