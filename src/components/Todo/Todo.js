import axios from 'axios';
import { useDrag } from 'react-use-gesture';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPenToSquare,
    faCheck,
    faXmark,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Task from '~/components/Task';
import classNames from 'classnames/bind';
import styles from './Todo.module.scss';

const cx = classNames.bind(styles);

function Todo({ todo, boardRef }) {
    const [editState, setEditState] = useState(false);
    const [updateState, setUpdateState] = useState('default');

    const [todoState, setTodoState] = useState(todo);
    const [todoChangeState, setTodoChangeState] = useState(todoState);
    const [settingPosState, setSettingPosState] = useState(false);

    useEffect(() => {
        updateSettingPosState();
        // eslint-disable-next-line
    }, []);

    const [isCreateTaskState, setIsCreateTaskState] = useState(false);

    const createTask = async () => {
        const token = JSON.parse(localStorage.getItem('token'));

        setIsCreateTaskState(true);

        await axios.post(
            'http://localhost:8080/api/task/' + todoState.id,
            null,
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        await axios
            .get('http://localhost:8080/api/todaytodo/' + todoState.id, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setTodoState(res.data);
            })
            .catch((err) => console.log(err));

        setIsCreateTaskState(false);
    };

    const updateSettingPosState = () => {
        if (
            todoState.posX +
                pinPosState.x +
                window.innerWidth -
                boardRef.current.offsetWidth +
                containerRef.current.offsetWidth / 2 >
            window.innerWidth - boardRef.current.offsetWidth / 2
        ) {
            setSettingPosState(true);
        } else {
            setSettingPosState(false);
        }
    };

    const updateTodo = () => {
        const todoDto = {
            ...todoChangeState,
            posX: todoState.posX + pinPosState.x,
            posY: todoState.posY + pinPosState.y,
        };
        const token = JSON.parse(localStorage.getItem('token'));
        axios
            .put('http://localhost:8080/api/todaytodo', todoDto, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setTodoState(res.data);
                setPinPosState({ x: 0, y: 0 });
            });
    };

    const handleChange = (e) => {
        setTodoChangeState((prevTodoChangeState) => ({
            ...prevTodoChangeState,
            [e.target.name]: e.target.value,
        }));
    };

    let containerSize = { small: false, medium: true, big: false };
    switch (todoChangeState.size) {
        case 'small': {
            containerSize = { small: true, medium: false, big: false };
            break;
        }
        case 'medium': {
            containerSize = { small: false, medium: true, big: false };
            break;
        }
        case 'big': {
            containerSize = { small: false, medium: false, big: true };
            break;
        }
        default: {
            containerSize = { small: false, medium: true, big: false };
        }
    }

    const containerRef = useRef(null);
    const [pinPosState, setPinPosState] = useState({ x: 0, y: 0 });
    const bindPinPos = useDrag(
        (params) => {
            setPinPosState({ x: params.movement[0], y: params.movement[1] });
            updateSettingPosState();

            if (!params.dragging) {
                updateTodo();
            }
        },
        {
            bounds: () => {
                return {
                    top: -todoState.posY,
                    left: -todoState.posX,
                    bottom:
                        boardRef.current.offsetHeight -
                        containerRef.current.offsetHeight -
                        todoState.posY -
                        10,
                    right:
                        boardRef.current.offsetWidth -
                        containerRef.current.offsetWidth -
                        todoState.posX -
                        10,
                };
            },
        }
    );

    return (
        <div
            style={{
                top: todoState.posY + pinPosState.y + 5,
                left: todoState.posX + pinPosState.x + 5,
            }}
            className={cx('ani-container')}
        >
            <div
                ref={containerRef}
                className={cx(
                    'container',
                    { edit: editState },
                    { landscape: todoChangeState.landscape },
                    {
                        ...containerSize,
                    }
                )}
            >
                {editState ? (
                    <img
                        src={require('~/assets/images/pin.png')}
                        alt="pin"
                        draggable="false"
                        className={cx('pin')}
                    />
                ) : (
                    <div {...bindPinPos()} className={cx('ani-pin')}>
                        <img
                            src={require('~/assets/images/pin.png')}
                            alt="pin"
                            draggable="false"
                            className={cx('pin')}
                        />
                    </div>
                )}

                {editState ? (
                    <div>
                        <button
                            className={cx('btn', 'confirm-update-todo')}
                            onClick={() => {
                                updateTodo();
                                setEditState(!editState);
                                setUpdateState('update');
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={cx('rounded', 'btn-icon', 'icon')}
                            />
                        </button>
                        <button
                            className={cx('btn', 'cancel-update-todo')}
                            onClick={() => {
                                setTodoChangeState(todoState);
                                setEditState(!editState);
                                setUpdateState('cancel');
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faXmark}
                                className={cx('rounded', 'btn-icon', 'icon')}
                            />
                        </button>
                    </div>
                ) : (
                    <button
                        className={cx('btn', 'update-todo')}
                        onClick={() => {
                            setEditState(!editState);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className={cx('rounded', 'btn-icon', 'icon')}
                        />
                    </button>
                )}

                {editState ? (
                    <div className={cx('content')}>
                        <input
                            value={todoChangeState.title}
                            className={cx('title')}
                            name="title"
                            onChange={handleChange}
                        />
                        <div className={cx('wrapper')}>
                            <div className={cx('detail')}>
                                <h4>Detail</h4>
                                {isCreateTaskState ? (
                                    <ul>
                                        {todoState.listTask.map((task) => (
                                            <li key={task.id}>
                                                <Task
                                                    task={task}
                                                    edit={editState}
                                                    update={updateState}
                                                    setUpdate={setUpdateState}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <ul>
                                        {todoState.listTask.map((task) => (
                                            <li key={task.id}>
                                                <Task
                                                    task={task}
                                                    edit={editState}
                                                    update={updateState}
                                                    setUpdate={setUpdateState}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <button
                                    className={cx('btn', 'add-task')}
                                    onClick={createTask}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className={cx(
                                            'rounded',
                                            'btn-icon',
                                            'icon-s'
                                        )}
                                    />
                                </button>
                            </div>
                            <div className={cx('note')}>
                                <h4>Note</h4>
                                <textarea
                                    value={todoChangeState.note}
                                    name="note"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={cx('content')}>
                        <h2 className={cx('title')}>{todoState.title}</h2>
                        <div className={cx('wrapper')}>
                            <div className={cx('detail')}>
                                <h4>Detail</h4>
                                {isCreateTaskState ? (
                                    <ul>
                                        {todoState.listTask.map((task) => (
                                            <li key={task.id}>
                                                <Task
                                                    task={task}
                                                    edit={editState}
                                                    update={updateState}
                                                    setUpdate={setUpdateState}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <ul>
                                        {todoState.listTask.map((task) => (
                                            <li key={task.id}>
                                                <Task
                                                    task={task}
                                                    edit={editState}
                                                    update={updateState}
                                                    setUpdate={setUpdateState}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <button
                                    className={cx('btn', 'add-task')}
                                    onClick={createTask}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className={cx(
                                            'rounded',
                                            'btn-icon',
                                            'icon-s'
                                        )}
                                    />
                                </button>
                            </div>
                            <div className={cx('note')}>
                                <h4>Note</h4>
                                <p>{todoState.note}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div
                    className={cx('setting', {
                        settingPos: settingPosState,
                    })}
                >
                    <h2>Setting</h2>
                    <div className={cx('setting-item')}>
                        <label htmlFor={'landscape' + todoState.id}>
                            Landscape
                        </label>
                        <input
                            type="checkbox"
                            name="landscape"
                            id={'landscape' + todoState.id}
                            checked={!!todoChangeState.landscape}
                            onChange={(e) => {
                                setTodoChangeState((prevTodoChangeState) => ({
                                    ...prevTodoChangeState,
                                    [e.target.name]:
                                        !prevTodoChangeState[e.target.name],
                                }));
                            }}
                        />
                    </div>
                    <div className={cx('setting-item')}>
                        <label htmlFor={'size' + todoState.id}>Size</label>
                        <select
                            name="size"
                            id={'size' + todoState.id}
                            value={todoChangeState.size}
                            onChange={handleChange}
                        >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="big">Big</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;
