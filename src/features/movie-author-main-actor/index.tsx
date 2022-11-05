import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import TableAuthorMainActor from './TableAuthorMainActor';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ModalEdit from './ModalEdit';

const gb = classNames.bind(globalStyles);

function MovieAuthorMainActorPage() {
    const { 
        currentPage, 
        search,
        type,

        statusCreated, 
        statusUpdated, 
        errorMessage, 
        statusDeleted,
    } = useAppSelector(state => state.authorActorState);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_LIST_AUTHOR_ACTOR',
            payload: {
                page: currentPage,
                search,
                type
            },
        });
    }, [search])

    return (
        <div className={gb('container-main')}>
            <ModalEdit />
            <Header />
            <TableAuthorMainActor />
            <div style={{paddingBottom: '20px'}} />
        </div>
    )
}

export default MovieAuthorMainActorPage