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

const gb = classNames.bind(globalStyles);

const STATUS_SUCCESS = 1;
const STATUS_FAILED = 2;

function MovieCategoryPage() {
    const dispatch = useAppDispatch();
    const dispatchToast = useToastify();

    const { onChangeModal } = useContext(ModalContext);

    const { currentPage, statusCreated, errorMessage } = useAppSelector(state => state.categoryState);
    
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
            onChangeModal(false);

            dispatch({
                type: 'FETCH_ALL_CATEGORIES',
                payload: currentPage,
            });
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
    }, [statusCreated])
    

    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_CATEGORIES',
            payload: currentPage,
        });
    }, [])
    

    return (
        <div className={gb('container-main')}>
            <ModalEdit />
        
            <Header />
            <TableCategory />
            <div style={{paddingBottom: '20px'}} />
        </div>
    )
}

export default MovieCategoryPage