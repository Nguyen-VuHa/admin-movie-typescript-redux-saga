import React, { useContext, useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import TableAuthorMainActor from './TableAuthorMainActor';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ModalEdit from './ModalEdit';
import useToastify from 'hooks/useToastify';
import { STATUS_FAILED, STATUS_SUCCESS } from 'constants/status';
import { setDefaultStatusAuthorActor } from 'reducers/authorActorReducer/authorActorSlice';
import { ModalContext } from 'contexts/ModalContext';
import { AuthorActorContextProvider } from 'contexts/AuthorActorContext';

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

    const dispatchToast = useToastify();
    const dispatch = useAppDispatch();
    const { setModalEditAuthorActor } = useContext(ModalContext);

    useEffect(() => {
        if(statusCreated === STATUS_SUCCESS) {
            dispatchToast({
                type: 'TYPE_SUCCESS',
                payload: {
                    message: 'Thêm mới thể loại thành công!',
                    position: 'top-left',
                }
            });

            dispatch(setDefaultStatusAuthorActor());
            setModalEditAuthorActor(false);
        }

        if(statusCreated === STATUS_FAILED) {
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    message: errorMessage || 'Thêm mới thất bại!',
                    position: 'top-left',
                }
            });

            dispatch(setDefaultStatusAuthorActor());
        }
    }, [statusCreated]);

    useEffect(() => {
        if(statusUpdated === STATUS_SUCCESS) {
            dispatchToast({
                type: 'TYPE_SUCCESS',
                payload: {
                    message: 'Cập nhật thể loại thành công!',
                    position: 'top-left',
                }
            });

            dispatch(setDefaultStatusAuthorActor());
            setModalEditAuthorActor(false);
        }

        if(statusUpdated === STATUS_FAILED) {
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    message: errorMessage || 'Cập nhật thất bại!',
                    position: 'top-left',
                }
            });

            dispatch(setDefaultStatusAuthorActor());
        }
    }, [statusUpdated])
    
    useEffect(() => {
        if(statusDeleted === STATUS_SUCCESS) {
            dispatchToast({
                type: 'TYPE_SUCCESS',
                payload: {
                    message: 'Xóa thể loại thành công!',
                    position: 'top-left',
                }
            });

            dispatch(setDefaultStatusAuthorActor());
            setModalEditAuthorActor(false);
        }

        if(statusDeleted === STATUS_FAILED) {
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    message: errorMessage || 'Xóa thất bại!',
                    position: 'top-left',
                }
            });

            dispatch(setDefaultStatusAuthorActor());
        }
    }, [statusDeleted])

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
        <AuthorActorContextProvider>
            <div className={gb('container-main')}>
                <ModalEdit />
                <Header />
                <TableAuthorMainActor />
                <div style={{paddingBottom: '20px'}} />
            </div>
        </AuthorActorContextProvider>
    )
}

export default MovieAuthorMainActorPage