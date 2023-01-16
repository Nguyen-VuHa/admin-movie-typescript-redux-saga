import React from 'react'
import classNames from 'classnames/bind';
import GlobalStyles from 'utils/globalStyle.module.scss';
import Styles from './header.module.scss';
import { IoCaretForwardOutline } from "react-icons/io5";
import ButtonShortPath from './ButtonShortPath';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { DEFAULT_FOLDER_ROOT } from 'constants/globalConstant';
import { setFolderSelected } from 'reducers/folderReducer/folderSlice';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

function Header() {
    const dispatch = useAppDispatch();
    const { listFolder, selectFolder } = useAppSelector(state => state.folderState);

    return (
        <div className={gb('wrapper-header', cx('sticky-header'))}>
            <div className={gb('header')}>
                <div
                    className={cx('layout-title')}
                >
                    <div 
                        className={cx('button-folder', ['active'])}
                        onClick={() => {
                            if(selectFolder.length > 0) {
                                dispatch({
                                    type: 'FETCH_FOLDER_BY_ID',
                                    payload: DEFAULT_FOLDER_ROOT
                                });
                                dispatch(setFolderSelected([]));
                            }
                        }}
                    >
                        My Folder
                    </div>
                    {
                        selectFolder && selectFolder.length > 0 &&
                        selectFolder.map((sl: any)=> {
                            return <div 
                                key={sl.id} className={gb('d-flex', ['df-justify-center', 'df-align-center'])}
                                onClick={() => {
                                    if(selectFolder[selectFolder.length - 1] && selectFolder[selectFolder.length - 1].id !== sl.id) {
                                        dispatch({
                                            type: 'FETCH_FOLDER_BY_ID',
                                            payload: sl.id
                                        });
                                        dispatch(setFolderSelected(selectFolder.slice(0, selectFolder.findIndex(slt => slt.id === sl.id) + 1)));
                                    }
                                }}
                            >
                                <div className={cx('dot')}>
                                    <IoCaretForwardOutline 
                                        size={18}
                                    />
                                </div>
                                <div className={cx('button-folder')}>{ sl.name }</div>
                            </div>
                        }) 
                    }
                    {/* <ButtonShortPath /> */}
                    {/* <div className={cx('button-folder')}>File Hệ Thống</div>
                    <div className={cx('dot')}>
                        <IoCaretForwardOutline 
                            size={18}
                        />
                    </div>
                    <div className={cx('button-folder')}>File Hệ Thống</div>
                    <div className={cx('dot')}>
                        <IoCaretForwardOutline 
                            size={18}
                        />
                    </div>
                    <div className={cx('button-folder')}>File Hệ Thống</div>
                    <div className={cx('dot')}>
                        <IoCaretForwardOutline 
                            size={18}
                        />
                    </div>
                    <div className={cx('button-folder')}>File Hệ Thống</div> */}
                </div>
                {/* <div
                    className={cx('layout-title')}
                    style={{width: 'auto', alignItems: 'flex-start'}}
                >
                
                </div> */}
            </div>
        </div>
    )
}

export default Header