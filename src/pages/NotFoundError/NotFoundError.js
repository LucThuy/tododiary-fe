import classNames from 'classnames/bind';
import styles from './NotFoundError.module.scss';

const cx = classNames.bind(styles);

function NotFoundError() {
    return (
        <div className={cx('container')}>
            <h1>
                <span className={cx('text-404')}>404</span>{' '}
                <span className={cx('text-notfound')}>NOT FOUND</span>
                <span className={cx('text-symbol')}>,</span>{' '}
                <span className={cx('text-sir')}>SIR</span>
            </h1>
        </div>
    );
}

export default NotFoundError;
