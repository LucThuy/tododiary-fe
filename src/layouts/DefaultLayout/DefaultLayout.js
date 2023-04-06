import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import SideBar from '../components/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('container-layout')}>
            <div className={cx('sidebar')}>
                <SideBar />
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
