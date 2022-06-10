import { Button, Container, Divider, IconButton, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import globalStyles from 'utils/globalStyle.module.scss';
import styles from './edit_todo.module.scss';
import classNames from 'classnames/bind';
import { CheckCircleOutline } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from 'models';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/hooks';

const gb = classNames.bind(globalStyles);
const cx = classNames.bind(styles);
export interface EditTodoProps {

}

const EditTodo = (props: EditTodoProps) => {
    const dispatch = useDispatch();

    const { arrTodo } = useAppSelector(state => state.todoState);

    const [textDescription, setTextDescription] = useState<string>('');
    let arrTodos: string | null = localStorage.getItem('arrTodo');

    useEffect(() => {
        dispatch({
            type: 'ADD_LIST_TODO',
            payload: arrTodos ? JSON.parse(arrTodos) : [],
        });
    }, [])

    const handleAddTodo = () => {
        if(textDescription) {
            const arrTemp: Array<Todo> = arrTodo;
            arrTemp.unshift({
                id: uuidv4(),
                todoName: textDescription,
                status: 1,
            });

            localStorage.setItem('arrTodo', JSON.stringify(arrTemp));
            setTextDescription('');
            dispatch({
                type: 'ADD_TODO',
                payload: {
                    id: uuidv4(),
                    todoName: textDescription,
                    status: 1,
                }
            })
        }
    }

    const handleUpdateTodo = (id?: string) => {
        localStorage.setItem('arrTodo', JSON.stringify(arrTodo.map((item: Todo) => item.id === id ? {...item, status: 0} : {...item})));
        dispatch({
            type: 'UPDATE_TODO',
            payload: id,
        });
    }

    return (
        <Container maxWidth="sm">
            <div className={gb('d-flex', 'df-justify-center', 'df-align-center', 'mt-2', 'flex-column')}>
                <h1 className={cx('header-text')}>
                    CREATE NEW TODO
                </h1>
                <TextField
                    className={gb('w-100')}
                    id="outlined-multiline-static"
                    label="Todo description..."
                    multiline
                    rows={4}
                    value={textDescription}
                    onChange={(e) => {
                        setTextDescription(e.target.value);
                    }}
                />
                <Button
                    className={gb('w-100', 'mt-1')}
                    variant="contained"
                    size="large"
                    disabled={!textDescription}
                    onClick={handleAddTodo}
                >
                    Add Todo
                </Button>
                <Divider className={gb('mt-1', 'mb-2', 'w-100')} />
                {
                    arrTodo && arrTodo.length > 0
                    ? arrTodo.map((item: Todo, idx: number) => {
                        return <div className={cx('item-todo', idx === 0 && 'firt')} key={item.id}>
                            <div className={cx('text-item', item.status === 0 ? 'text-remove' : '')}>{ item.todoName }</div>
                            <div className={gb('flex-shrink-0')}>
                            {
                                item.status !== 0 
                                && <Tooltip title="Completed Todo" arrow>
                                    <IconButton aria-label="checked" color="success" onClick={() => handleUpdateTodo(item.id)}>
                                        <CheckCircleOutline />
                                    </IconButton>
                                </Tooltip>
                            }
                            </div>
                        </div>
                    })
                    : ""
                }
            </div>
        </Container>
    )
}

export default EditTodo;