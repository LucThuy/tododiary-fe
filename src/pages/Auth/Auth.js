import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretLeft,
    faCaretRight,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FaGooglePlusSquare, FaFacebookSquare } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PreviewImage from '../../components/PreviewImage/PreviewImage';

import { loginUser, clearLoginErr, registerUser } from '../../actions';

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
    const err = useSelector((state) => state.err);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/todaytodo');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        dispatch(clearLoginErr());
    }, [dispatch]);

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

        dispatch(clearLoginErr());
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(loginState));
    };

    const [registerState, setRegisterState] = useState({
        name: '',
        username: '',
        password: '',
    });

    const [avatarState, setAvatarState] = useState();

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;

        setRegisterState((prevRegisterState) => ({
            ...prevRegisterState,
            [name]: value,
        }));
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const registerData = new FormData();
        for (const key in registerState) {
            registerData.append(key, registerState[key]);
        }
        registerData.append('avatar', avatarState);
        dispatch(registerUser(registerData));
    };

    return (
        <div
            className={cx('container', 'container-content', {
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
                            {err && (
                                <p className={cx('error')}>
                                    Account is not exist
                                </p>
                            )}
                            <input
                                onFocus={() => {
                                    setMode('login');
                                }}
                                type="submit"
                                value="Login"
                                className={cx('submit', 'rounded', 'btn-icon')}
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
                <div className={cx('content', 'rounded')}>
                    <div className={cx('title')}>
                        <h2>Register</h2>
                    </div>
                    <div className={cx('action')}>
                        <div className={cx('expand')}>
                            <PreviewImage setImageState={setAvatarState} />
                            <div className={cx('other-link')}>
                                <h2>Or register with</h2>
                                <ul>
                                    <li>
                                        <a href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect">
                                            <FaGooglePlusSquare
                                                className={cx('icon')}
                                            />
                                            <span>Google</span>
                                        </a>
                                    </li>
                                    <li>
                                        <FaFacebookSquare
                                            className={cx('icon')}
                                        />
                                        <span>Facebook</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <form onSubmit={handleRegisterSubmit}>
                            <div className={cx('input-field')}>
                                <label htmlFor="register-name">Name</label>
                                <input
                                    onFocus={() => {
                                        setMode('register');
                                    }}
                                    type="text"
                                    className={cx('rounded')}
                                    id="register-name"
                                    placeholder="Name"
                                    name="name"
                                    value={registerState.name}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className={cx('input-field')}>
                                <label htmlFor="register-username">
                                    Username
                                </label>
                                <input
                                    onFocus={() => {
                                        setMode('register');
                                    }}
                                    type="text"
                                    className={cx('rounded')}
                                    id="register-username"
                                    placeholder="Username"
                                    name="username"
                                    value={registerState.username}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className={cx('input-field')}>
                                <label htmlFor="register-password">
                                    Password
                                </label>
                                <input
                                    onFocus={() => {
                                        setMode('register');
                                    }}
                                    type="password"
                                    className={cx('rounded')}
                                    id="register-password"
                                    placeholder="Password"
                                    name="password"
                                    value={registerState.password}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <input
                                onFocus={() => {
                                    setMode('register');
                                }}
                                type="submit"
                                value="Register"
                                className={cx('submit', 'rounded', 'btn-icon')}
                            />
                        </form>
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
