import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import ArticleIcon from '@mui/icons-material/Article';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import DashBoard from 'features/dashboard';
import TodoList from 'features/todo';
import EditTodo from 'features/edit-todo';
export interface AdminProps {

}

const checkUrlActive = (pathName: string) => {
    if(pathName.includes('/dashboard') || pathName === '/admin')
        return 0;
    if(pathName.includes('/todo-list'))
        return 1;
    if(pathName.includes('/edit-todo'))
        return 2;
}

export default function Admin(props: AdminProps) {
    const navigate = useNavigate();
    const [valueActive, setValueActive] = useState(checkUrlActive(window.location.pathname));

    useEffect(() => {
        if(valueActive === 0)
            navigate('dashboard');
        if(valueActive === 1)
            navigate('todo-list');
        if(valueActive === 2)
            navigate('edit-todo');
    }, [valueActive])

    return (
        <div>
            <BottomNavigation
                showLabels
                value={valueActive  || 0}
                onChange={(event, newValue) => {
                    setValueActive(newValue);
                }}
            >
                <BottomNavigationAction label="Dashboard" icon={<AccessTimeIcon />} />
                <BottomNavigationAction label="TodoList" icon={<AlignVerticalBottomIcon />} />
                <BottomNavigationAction label="CreateTodoList" icon={<ArticleIcon />} />
            </BottomNavigation>
            <div>
                <Routes>
                    <Route path="/dashboard" element={<DashBoard />}/>
                    <Route path="/todo-list" element={<TodoList />}/>
                    <Route path="/edit-todo/*" element={<EditTodo />}/>
                </Routes>
            </div>
        </div>
    )
}