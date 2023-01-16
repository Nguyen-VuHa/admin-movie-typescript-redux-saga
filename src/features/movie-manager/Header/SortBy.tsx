import React, { useContext, useEffect, useRef, useState, useCallback } from 'react'
import classNames from 'classnames/bind';
import Styles from './header.module.scss';
import { MovieContext } from 'contexts/MovieContext';
import { useAppDispatch } from 'app/hooks';
import { setSortBy } from 'reducers/movieReducer/movieSlice';

const cx = classNames.bind(Styles);

function SortBy() {
    const dispatch = useAppDispatch();
    const buttonRef = useRef<any>(null);
    const [nameFilter, setNameFilter] = useState<string>('Chọn bộ lọc');

    const { movieState, dispatchMovie } = useContext(MovieContext);
    const { statusSort } = movieState;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (buttonRef.current && !buttonRef.current?.contains(event.target)) {
                dispatchMovie({
                    type: 'SET_STATUS_SORT',
                    payload: false,
                })
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleHideSort = useCallback(() => {
        dispatchMovie({
            type: 'SET_STATUS_SORT',
            payload: false,
        })
    },[]);
    

    return (
        <div 
            style={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                alignItems: 'flex-start', 
                flexDirection: 'column', 
                position: 'relative',
                whiteSpace: 'nowrap',
            }}
            ref={buttonRef}
        >
            <span className={cx('text')} style={{margin: 0}}>Sắp xếp theo:</span>
            <div
                onClick={() => {
                    dispatchMovie({
                        type: 'SET_STATUS_SORT',
                        payload: !statusSort,
                    })
                }}
                className={cx('filter-item-btn', statusSort && 'show')}
            >
                <div className={cx('filter-item')}>
                    { nameFilter }
                </div>
                <span className={cx('span-icon')} />
            </div>
            <ul className={cx('filter-drop-menu', statusSort && 'show')}>
                <li 
                    onClick={() => { 
                        setNameFilter('Ngày bắt đầu'); 
                        dispatch(setSortBy('STARTDATE'))
                        handleHideSort();
                        
                    }}
                >
                    Ngày bắt đầu
                </li>
                <li 
                    onClick={() => { 
                        setNameFilter('Ngày kết thúc'); 
                        dispatch(setSortBy('ENDDATE'))
                        handleHideSort(); 
                    }}
                >
                    Ngày kết thúc
                </li>
                <li 
                    onClick={() => { 
                        setNameFilter('Trạng thái'); 
                        dispatch(setSortBy('STATUS'))
                        handleHideSort();
                       
                    }}
                >
                    Trạng thái
                </li>
            </ul>
        </div>
    )
}

export default SortBy