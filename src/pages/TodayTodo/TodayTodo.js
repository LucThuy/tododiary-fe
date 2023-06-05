import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './TodayTodo.module.scss';
import Todo from '~/components/Todo';

const cx = classNames.bind(styles);

function TodayTodo() {
    const boardRef = useRef(null);

    const [listTodoState, setListTodoState] = useState([]);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        axios
            .get('http://localhost:8080/api/todaytodo', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setListTodoState(res.data.listTodo);
            });
    }, []);

    const createTodayTodo = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        axios
            .post('http://localhost:8080/api/todaytodo', null, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setListTodoState((prevListTodoState) => [
                    ...prevListTodoState,
                    res.data,
                ]);
            });
    };

    return (
        <div ref={boardRef} className={cx('container', 'container-content')}>
            {listTodoState.map((todo) => (
                <Todo todo={todo} boardRef={boardRef} key={todo.id} />
            ))}

            <button className={cx('btn', 'add-todo')} onClick={createTodayTodo}>
                <FontAwesomeIcon
                    icon={faPlus}
                    className={cx('rounded', 'add-todo-icon', 'btn-icon')}
                />
            </button>
        </div>
    );
}

export default TodayTodo;
