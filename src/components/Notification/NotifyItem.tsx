import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './notification.module.scss';
import IonIcon from '@reacticons/ionicons';

const cx = classNames.bind(styles);

const objStatus = [
    {
        name: 'success',
        node: <IonIcon name="checkmark-circle" size='large' style={{marginRight: 10}}/>
    },
    {
        name: 'info',
        node: <IonIcon name="information-circle" size='large' style={{marginRight: 10}}/>
    },
    {
        name: 'warn',
        node: <IonIcon name="warning" size='large' style={{marginRight: 10}}/>
    },
    {
        name: 'error',
        node: <IonIcon name="alert-circle" size='large' style={{marginRight: 10}}/>
    }
]

interface NotifyItem {
    point?: 'top-left' | 'bottom-left' | 'middle-top' | 'middle-bottom' | 'top-right' | 'bottom-right',
    type?: 'normal' | 'success' | 'info' | 'warn' | 'error',
    duration?: number,
    toastText?: string,
    onRemoveItem?: Function,
}

function NotifyItem({point, duration = 3000, type = 'normal', toastText, onRemoveItem}: NotifyItem) {
    const [statusShow, setStatusShow] = useState(true);

    useEffect(() => {
        let timeOut = setTimeout(() => {
            setStatusShow(false);
            onRemoveItem && onRemoveItem();
        }, duration);

        return () => clearTimeout(timeOut)
    }, [duration])

    return (
        <div className={cx('notify-items')}>
            <div className={cx('notify-layout', statusShow ? `${point}-show` : `${point}-hide`)}>
                <div className={cx('notify-content', type)}>
                    {
                        objStatus.filter(obj => obj.name === type).length > 0 &&
                        objStatus.filter(obj => obj.name === type)[0].node
                    }
                    <div className={cx('notify-text')}>
                        { toastText }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(NotifyItem);
