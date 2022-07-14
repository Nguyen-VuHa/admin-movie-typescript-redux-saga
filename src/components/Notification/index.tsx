import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './notification.module.scss';
import NotifyItem from './NotifyItem';
import { useAppDispatch } from 'app/hooks';
import { removeItemTopLeft } from 'reducers/toastifyReducer/toastifySlice';

const cx = classNames.bind(styles);

interface NotificationType {
    position?: 'top-left' | 'bottom-left' | 'middle-top' | 'middle-bottom' | 'top-right' | 'bottom-right',
    listToast?: Array<any>,
}

export default function Notification({ position = 'top-right', listToast = [] }: NotificationType) {
    const dispatch = useAppDispatch();

    const [listToastify, setListToastify] = useState<Array<any>>([]);

    const handleRemoveItem = useCallback((uuid: string) => {
        setTimeout(() => {
            dispatch(removeItemTopLeft(uuid));
        }, 600);
    },[]);

    useEffect(() => {
        setListToastify(listToast);
    }, [listToast])
    

    return (
        <div className={cx('warapper', position)}>
            {
                listToastify && listToastify.length > 0 &&
                listToastify.map((ls) => {
                    return <NotifyItem 
                        key={ls.uuid}
                        point={position} 
                        toastText={ls.toastText}
                        duration={ls.duration} 
                        type={ls.type}
                        onRemoveItem={() => handleRemoveItem(ls.uuid)}
                    />
                })
            }
           
        </div>
    )
}