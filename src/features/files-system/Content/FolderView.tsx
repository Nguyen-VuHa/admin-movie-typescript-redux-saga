import React, { useState, useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import classNames from 'classnames/bind';
import { IoFolderOpen } from 'react-icons/io5';
import CommonStyle from 'utils/common.style.module.scss';
import Styles from './content.module.scss';
import { addFolderSelected } from 'reducers/folderReducer/folderSlice';
import MenuItem from './MenuItem';

const cm = classNames.bind(CommonStyle);
const cx = classNames.bind(Styles);

interface ObjPosition {
    pageX: any,
    pageY: any
}

function FolderView() {
    const { listFolder } = useAppSelector(state => state.folderState);

    const [positionMenu, setPositionMenu] = useState<ObjPosition | null>(null);
    const [isMenu, setisMenu] = useState<boolean>(false)

    const handleContextMenu = (postion: any) => {
        setisMenu(true);

        setPositionMenu({
            pageX: postion.pageX,
            pageY: postion.pageY
        })
    }

    return (
        <>
            <div className={cm('title')}>
                Thư mục
            </div>
            
            <div className={cx('wrapper-folder')}>
                <MenuItem 
                    isShow={isMenu}
                    pageX={positionMenu && positionMenu.pageX}
                    pageY={positionMenu && positionMenu.pageY}
                    setisMenu={setisMenu}
                />
                {
                    listFolder && listFolder.length > 0 && 
                    listFolder.map((lf: any) => {
                        return <ItemFolder 
                            key={lf.id} 
                            data={lf} 
                            onMouseRightMenu={(postion: any) => handleContextMenu(postion)}
                            setisMenu={setisMenu}
                        />
                    })
                }
            </div>
        </>
    )
}

const ItemFolder = ({ data, onMouseRightMenu, setisMenu }: any) => {
    const dispatch = useAppDispatch();
    
    return (
        <div 
            className={cx('folder-item')} key={data.id}
            onClick={() => {
                dispatch({
                    type: 'FETCH_FOLDER_BY_ID',
                    payload: data.id
                });
                dispatch(addFolderSelected({ 
                    id: data.id,
                    name: data.folder_name
                }))
            }}
            onContextMenu={(e: any) => {
                setisMenu(false);
                var rect = e.target.getBoundingClientRect(); // Lấy vị trí  con trỏ chuột để xử lý position cho contextmenu
                
                onMouseRightMenu && onMouseRightMenu(e)
            }}
        >
            <IoFolderOpen 
                size={25}
                style={{ flexShrink: 0, marginRight: '20px' }}
            />
            <span className={cx('text-item')}>{ data.folder_name }</span>
        </div>
    )
}   

export default FolderView