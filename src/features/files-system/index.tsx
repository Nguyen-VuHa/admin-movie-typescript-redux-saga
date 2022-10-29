import React, { useEffect } from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import { useAppDispatch } from 'app/hooks';
import { DEFAULT_FOLDER_ROOT } from 'constants/globalConstant';
import ContentFileSystem from './Content';

const gb = classNames.bind(globalStyles);

function FileSystemPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_FOLDER_BY_ID',
            payload: DEFAULT_FOLDER_ROOT
        })
    }, [])
    
    
    useEffect(() => {
        window.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });

        return () => {
            window.removeEventListener("contextmenu", () => {});
        }
    }, [])
    
    return (
        <div className={gb('container-main')}>
            <Header />
            <ContentFileSystem />
        </div>
    )
}

export default FileSystemPage