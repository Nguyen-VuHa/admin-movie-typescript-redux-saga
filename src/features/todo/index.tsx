import { Container, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from 'models';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/hooks';

const gb = classNames.bind(globalStyles);

export interface TodoListProps {

}
  
const TodoList = (props: TodoListProps) => {
    const dispatch = useDispatch();

    const { arrTodo } = useAppSelector(state => state.todoState);
    
    let arrTodos: string | null = localStorage.getItem('arrTodo');

    const [pageSize, setPageSize] = useState(10);
    const [start, setStart] = useState(0);  
    const [end, setEnd] = useState(pageSize);

    useEffect(() => {
        dispatch({
            type: 'ADD_LIST_TODO',
            payload: arrTodos ? JSON.parse(arrTodos) : [],
        });
    }, [])
    

    const handleRemoveItem = (id: string | undefined) => {
        if(id) {
            let arrTemp: Array<Todo> = [];
            arrTemp = arrTodo.filter(r => r.id !== id);
            localStorage.setItem('arrTodo', JSON.stringify(arrTemp));
            dispatch({
                type: 'REMOVE_TODO',
                payload: id,
            })
        }
    }

    return (
        <Container maxWidth="lg">
            <TableContainer component={Paper} className={gb('mt-2')}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Todo Name</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Controls</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        arrTodo.length > 0 ?
                            arrTodo.map((row, idx) => {
                                if(idx >= start && idx < end) {
                                    return <TableRow
                                        key={idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.todoName}
                                        </TableCell>
                                        <TableCell align="right">{row.status ? 'Chưa làm' : 'Đã làm'}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Remove Todo" arrow>
                                                <IconButton aria-label="delete" size="large" onClick={() => handleRemoveItem(row.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                }
                            })
                        : <TableRow>
                            <TableCell scope="row">Không có công việc nào!</TableCell>
                        </TableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination 
                className={gb('mt-2')} 
                count={Math.ceil(arrTodo.length / pageSize)} 
                variant="outlined" shape="rounded" 
                onChange={(e, value) => {
                    setStart(pageSize * (value - 1));
                    setEnd(pageSize + (pageSize * (value - 1)));
                }}
            />
        </Container>
    )
}

export default TodoList;