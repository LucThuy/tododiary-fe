import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Task.module.scss';

const cx = classNames.bind(styles);

function Task({ task, edit, update, setUpdate }) {
    const [taskState, setTaskState] = useState(task);
    const [taskChangeState, setTaskChangeState] = useState(taskState);

    useEffect(() => {
        if (update === 'update') {
            const token = JSON.parse(localStorage.getItem('token'));
            axios
                .put('http://localhost:8080/api/task', taskChangeState, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                .then((res) => {
                    setTaskState(res.data);
                });
        } else if (update === 'cancel') {
            setTaskChangeState(taskState);
        }
        setUpdate('default');
    }, [update, setUpdate]);

    const handleProgressChange = (e) => {
        const taskDto = {
            ...taskState,
            progress: taskState.progress === 100 ? 0 : 100,
        };

        const token = JSON.parse(localStorage.getItem('token'));
        axios
            .put('http://localhost:8080/api/task', taskDto, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setTaskState(res.data);
                setTaskChangeState(res.data);
            });
    };

    const handleChange = (e) => {
        setTaskChangeState((prevTaskChangeState) => ({
            ...prevTaskChangeState,
            [e.target.name]: e.target.value,
        }));
    };

    if (edit) {
        return (
            <div className={cx('container')}>
                <button className={cx('btn', 'delete-todo')}>
                    <FontAwesomeIcon
                        icon={faTrash}
                        className={cx('rounded', 'btn-icon', 'icon-s')}
                    />
                </button>
                <input
                    name="detail"
                    value={taskChangeState.detail}
                    className={cx('detail')}
                    onChange={handleChange}
                />
            </div>
        );
    }

    return (
        <div className={cx('container')}>
            <input
                type="checkbox"
                id={'task' + taskState.id}
                name="progress"
                checked={taskState.progress === 100}
                className={cx('checkbox')}
                onChange={handleProgressChange}
            />
            <label
                htmlFor={'task' + taskState.id}
                data-content={taskState.detail}
            >
                {taskState.detail}
            </label>
        </div>
    );
}

export default Task;
