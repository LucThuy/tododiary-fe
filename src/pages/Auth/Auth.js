import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Auth() {
    return (
        <div className={cx('container', 'rounded')}>
            <div className={cx('section')}>
                <div className={cx('content', 'rounded')}>
                    <div className={cx('title')}>
                        <h2>Login</h2>
                    </div>
                    <form>
                        <div className={cx('input-field')}>
                            <label htmlFor="login-username">Username</label>
                            <input
                                type="text"
                                className={cx('rounded')}
                                id="login-username"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div className={cx('input-field')}>
                            <label htmlFor="login-password">Password</label>
                            <input
                                type="password"
                                className={cx('rounded')}
                                id="login-password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <input
                            type="submit"
                            value="Login"
                            className={cx('submit', 'rounded')}
                        />
                    </form>
                </div>
                <button className={cx('button-span', 'rounded')}>
                    <FontAwesomeIcon
                        icon={faCaretRight}
                        className={cx('icon')}
                    />
                </button>
            </div>
            <div className={cx('section')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <h2>Todo Diary</h2>
                    </div>
                </div>
            </div>
            <div className={cx('section')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <h2>Register</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
