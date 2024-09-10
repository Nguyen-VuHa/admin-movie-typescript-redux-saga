import { useAppDispatch, useAppSelector } from 'app/hooks';
import classNames from 'classnames/bind';
import useToastify from 'hooks/useToastify';
import { useRef } from 'react';
import { RiVideoUploadFill } from "react-icons/ri";
import { setVideoFileUpload } from 'reducers/studioVideoReducer/studioVideoSlice';
import Styles from './formdata.module.scss';

const cx = classNames.bind(Styles);

interface FormDataProps {
    setSelectedFile: Function;
}

function GroupVideo({setSelectedFile}: FormDataProps) {
    return (
        <div>  
            <div className={cx('title-form')}>UPLOAD VIDEO</div>
           
            <div className={cx('wrapper-image')}>
                <InputSelectVideo setSelectedFile={setSelectedFile}/>
            </div>
        </div>
    )
}

const InputSelectVideo = ({setSelectedFile}: FormDataProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const layoutRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const dispatchToast = useToastify();
    const { videoFileUpload } = useAppSelector(state => state.studioVideoState)

    const handleSaveFile = (file: any) => {
        if(file && file.type.startsWith('video/')) {
            if(file.size / 1024 / 1024 <= 100) {
                setSelectedFile(file)
                dispatch(setVideoFileUpload({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                }));
            } else {
                dispatchToast({
                    type: 'TYPE_ERROR',
                    payload: {
                        position: 'top-left',
                        message: 'Kích thước tệp tải lên vượt quá mức cho phép (100MB).'
                    }
                })
            }
        } else {
            dispatchToast({
                type: 'TYPE_WARN',
                payload: {
                    position: 'top-left',
                    message: 'Hãy chắc chắn tệp của bạn là file video!'
                }
            })
        }
    }

    return (
        <>
            <input 
                ref={inputRef}
                className='d-none'
                type="file"
                accept="video/*"
                value=""
                onChange={(e: any) => {
                    if(e.target.files && e.target.files.length > 0) {
                        handleSaveFile(e.target.files[0]);
                    } else {
                        dispatchToast({
                            type: 'TYPE_WARN',
                            payload: {
                                position: 'top-left',
                                message: 'File không tồn tại!'
                            }
                        })
                    }
                }}
            />
            <div 
                ref={layoutRef}
                className={cx('layout-image')}
                onClick={() => {
                    if(inputRef.current) {
                        inputRef.current.click();
                    }
                }}
                onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
                onDragEnter={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
                onDragLeave={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
                onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
    
                    let file = e.dataTransfer.files[0];
                    
                    if(file) {
                        handleSaveFile(file);
                    } else {
                        dispatchToast({
                            type: 'TYPE_WARN',
                            payload: {
                                position: 'top-left',
                                message: 'File không tồn tại!'
                            }
                        })
                    }
                }}
            >
                <RiVideoUploadFill size={40} />
                {
                    videoFileUpload ? <>
                        <div className='mt-1 p-1 text-center'>{videoFileUpload && videoFileUpload.name}</div>
                    </>
                    : <>
                        <div className='mt-1 p-1 text-center'>Kéo thả file hoặc nhấn để tải file lên</div>
                        <div>(Lưu ý video không vượt quá 100MB)</div>
                    </>
                }
                
            </div>
        </>
    )
}

export default GroupVideo