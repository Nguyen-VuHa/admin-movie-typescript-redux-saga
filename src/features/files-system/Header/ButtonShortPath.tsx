import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind';
import Styles from './header.module.scss';
import { IoEllipsisHorizontal, IoFolderOpen } from 'react-icons/io5';

const cx = classNames.bind(Styles);

function ButtonShortPath() {
    const blockRef = useRef<HTMLDivElement>(null);
    const [isShowDrop, setIsShowDrop] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('mousedown', (e) => {
            if(blockRef.current && !blockRef.current.contains(e.target as Node))
                setIsShowDrop(isShowDrop && false);
        });

        return () => {
            window.removeEventListener('mousedown', () => {});
        }
    }, []);
    
    return (
        <div>
            <div className={cx('dot')} ref={blockRef}>
                <div className={cx('button-compact', [ isShowDrop && 'active' ])} onClick={() => { setIsShowDrop(!isShowDrop) }}>
                    <IoEllipsisHorizontal 
                        size={20}
                    />
                </div>
                <div className={cx('wrapper-drop', [ isShowDrop && 'show' ])}>
                    <div className={cx('drop-item')}>
                        <IoFolderOpen size={20} style={{ marginRight: '10px' }}/>
                        Folder 1
                    </div>
                    <div className={cx('drop-item')}>
                        <IoFolderOpen size={20} style={{ marginRight: '10px' }}/>
                        Folder 2
                    </div>
                    <div className={cx('drop-item')}>
                        <IoFolderOpen size={20} style={{ marginRight: '10px' }}/>
                        Folder 3
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ButtonShortPath