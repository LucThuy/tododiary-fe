import classNames from 'classnames/bind';
import styles from './NoSidebarLayout.module.scss';

const cx = classNames.bind(styles);

function NoSidebarLayout({ children }) {
    return <div className={cx('container-layout')}>{children}</div>;
}

export default NoSidebarLayout;
