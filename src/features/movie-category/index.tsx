import React, { useEffect, useContext } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import TableCategory from './TableCategory';
import ModalEdit from './ModalEdit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import useToastify from 'hooks/useToastify';
import { setDefaultStatus } from 'reducers/categoryReducer/categorySlice';
import { ModalContext } from 'contexts/ModalContext';
import { CategoryContextProvider } from 'contexts/CategoryContext';
import { STATUS_FAILED, STATUS_SUCCESS } from 'constants/status';

const gb = classNames.bind(globalStyles);

function MovieCategoryPage() {
    const dispatch = useAppDispatch();
    const dispatchToast = useToastify();

    const { setModalEditCate } = useContext(ModalContext);

    const { 
        currentPage, 
        statusCreated, 
        statusUpdated, 
        errorMessage, 
        search,
        statusDeleted
    } = useAppSelector(state => state.categoryState);
    
    useEffect(() => {
        if(statusCreated === STATUS_SUCCESS) {
            dispatchToast({
                type: 'TYPE_SUCCESS',
                payload: {
                    message: 'Thêm mới thể loại thành công!',
                    position: 'top-left',
                }
            });

            dispatch(setDefaultStatus());
            setModalEditCate(false);
        }

        if(statusCreated === STATUS_FAILED) {
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    message: errorMessage || 'Thêm mới thất bại!',
                    position: 'top-left',
                }
            });

            dispatch(setDefaultStatus());
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

            dispatch(setDefaultStatus());
            setModalEditCate(false);
        }

        if(statusUpdated === STATUS_FAILED) {
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    message: errorMessage || 'Cập nhật thất bại!',
                    position: 'top-left',
                }
            });

            dispatch(setDefaultStatus());
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

            dispatch(setDefaultStatus());
            setModalEditCate(false);
        }

        if(statusDeleted === STATUS_FAILED) {
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    message: errorMessage || 'Xóa thất bại!',
                    position: 'top-left',
                }
            });

            dispatch(setDefaultStatus());
        }
    }, [statusDeleted])

    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_CATEGORIES',
            payload: {
                page: currentPage,
                search
            },
        });
    }, [search])
    

    return (
        <CategoryContextProvider>
            <div className={gb('container-main')}>
                <ModalEdit />
                <Header />
                <TableCategory />
                <div style={{paddingBottom: '20px'}} />
            </div>
        </CategoryContextProvider>
    )
}

export default MovieCategoryPage