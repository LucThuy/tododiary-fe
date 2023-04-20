import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretLeft,
    faCaretRight,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FaGooglePlusSquare, FaFacebookSquare } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../actions';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Auth() {
    const [modeDefault, setModeDefault] = useState(true);
    const [modeLogin, setModeLogin] = useState(false);
    const [modeRegister, setModeRegister] = useState(false);
    const [modeIntroduction, setModeIntroduction] = useState(false);

    const setMode = (mode) => {
        switch (mode) {
            case 'default': {
                setModeDefault(true);
                setModeLogin(false);
                setModeRegister(false);
                setModeIntroduction(false);
                break;
            }
            case 'login': {
                setModeDefault(false);
                setModeLogin(true);
                setModeRegister(false);
                setModeIntroduction(false);
                break;
            }
            case 'register': {
                setModeDefault(false);
                setModeLogin(false);
                setModeRegister(true);
                setModeIntroduction(false);
                break;
            }
            default: {
                setModeDefault(true);
                setModeLogin(false);
                setModeRegister(false);
                setModeIntroduction(false);
            }
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    if (isAuthenticated) {
        navigate('/todaytodo');
    }

    const [loginState, setLoginState] = useState({
        username: '',
        password: '',
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;

        setLoginState((prevLoginState) => ({
            ...prevLoginState,
            [name]: value,
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(loginState));
    };

    return (
        <div
            className={cx('container', 'rounded', {
                default: modeDefault,
                login: modeLogin,
                register: modeRegister,
                introduction: modeIntroduction,
            })}
        >
            <div className={cx('section', 'section-login')}>
                <div className={cx('content', 'rounded')}>
                    <div className={cx('title')}>
                        <h2>Login</h2>
                    </div>
                    <div className={cx('action')}>
                        <form onSubmit={handleLoginSubmit}>
                            <div className={cx('input-field')}>
                                <label htmlFor="login-username">Username</label>
                                <input
                                    onFocus={() => {
                                        setMode('login');
                                    }}
                                    type="text"
                                    className={cx('rounded')}
                                    id="login-username"
                                    placeholder="Username"
                                    name="username"
                                    value={loginState.username}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <div className={cx('input-field')}>
                                <label htmlFor="login-password">Password</label>
                                <input
                                    onFocus={() => {
                                        setMode('login');
                                    }}
                                    type="password"
                                    className={cx('rounded')}
                                    id="login-password"
                                    placeholder="Password"
                                    name="password"
                                    value={loginState.password}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <input
                                onFocus={() => {
                                    setMode('login');
                                }}
                                type="submit"
                                value="Login"
                                className={cx('submit', 'rounded')}
                            />
                        </form>
                        <div className={cx('expand')}>
                            <h2>Or login with</h2>
                            <ul>
                                <li>
                                    <FaGooglePlusSquare
                                        className={cx('icon')}
                                    />
                                    <span>Google</span>
                                </li>
                                <li>
                                    <FaFacebookSquare className={cx('icon')} />
                                    <span>Facebook</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        modeLogin ? setMode('default') : setMode('login');
                    }}
                    className={cx('button-span', 'rounded')}
                >
                    {modeLogin ? (
                        <FontAwesomeIcon
                            icon={faXmark}
                            className={cx('icon')}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faCaretRight}
                            className={cx('icon')}
                        />
                    )}
                </button>
            </div>
            <div className={cx('section', 'section-introduction')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <h2>Todo Diary</h2>
                    </div>
                </div>
            </div>
            <div className={cx('section', 'section-register')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <h2>Register</h2>
                    </div>
                </div>
                <button
                    onClick={() => {
                        modeRegister ? setMode('default') : setMode('register');
                    }}
                    className={cx('button-span', 'rounded')}
                >
                    {modeRegister ? (
                        <FontAwesomeIcon
                            icon={faXmark}
                            className={cx('icon')}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faCaretLeft}
                            className={cx('icon')}
                        />
                    )}
                </button>
            </div>
        </div>
    );
}

export default Auth;
