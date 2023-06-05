import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('container', 'rounded')}>
            <h2>Profile</h2>
        </div>
    );
}

export default Profile;
