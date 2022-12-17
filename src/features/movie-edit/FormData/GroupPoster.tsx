import React, { useRef } from 'react'
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';

import { RiImageAddFill } from "react-icons/ri";
import ModalEditPoster from './ModalEditPoster';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { removeItemPoster, setImageBase64, setModalEditImage } from 'reducers/movieReducer/movieSlice';
import useToastify from 'hooks/useToastify';
import { IoClose } from "react-icons/io5";

const cx = classNames.bind(Styles);

function GroupPoster() {
    const dispatch = useAppDispatch();

    const { listPoster } = useAppSelector(state => state.movieState);

    return (
        <div>  
            <ModalEditPoster />
            <div className={cx('title-form')}>POSTER</div>
           
            <div className={cx('wrapper-image')}>
                {
                    listPoster && listPoster.length > 0
                    && listPoster.map((lt: any, index: number) => {
                        return <div className={cx('layout-image')}>
                            <img 
                                key={index}
                                src={lt.base64}
                                alt="NO POSTER"
                                width="100%"
                                style={{
                                    backgroundSize: "cover",
                                }}
                            />
                            <div 
                                className={cx('button-remove')}
                                onClick={() => {
                                    dispatch(removeItemPoster(lt.id));
                                }}
                            >
                                <IoClose size={20}/>
                            </div>
                        </div>
                    }) 
                }

                {
                    listPoster.length < 4 && <InputSelectImage />
                }
                
                
            </div>
        </div>
    )
}

const InputSelectImage = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const layoutRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const dispatchToast = useToastify();

    const handleSaveFile = (file: any) => {
        if(file && file.type.includes('image')) {
            if(file.size / 1024 / 1024 <= 3) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    if(reader.result) {
                        dispatch(setModalEditImage(true));
                        dispatch(setImageBase64(reader.result));
                    }
                };
                reader.onerror = error => {
                    dispatchToast({
                        type: 'TYPE_WARN',
                        payload: {
                            position: 'top-left',
                            message: 'Lỗi khi xử lý hình ảnh!'
                        }
                    })
                }
            } else {
                dispatchToast({
                    type: 'TYPE_ERROR',
                    payload: {
                        position: 'top-left',
                        message: 'Kích thước ảnh tải lên vượt quá mức cho phép (3MB).'
                    }
                })
            }
        } else {
            dispatchToast({
                type: 'TYPE_WARN',
                payload: {
                    position: 'top-left',
                    message: 'Hãy chắc chắn file của bạn là file hình ảnh!'
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
                accept="image/png, image/jpeg"
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
                <RiImageAddFill size={40} />
                <div className='mt-1 p-1 text-center'>Kéo thả ảnh hoặc nhấn để tải ảnh lên</div>
                <div>(Lưu ý ảnh không vượt quá 3MB)</div>
            </div>
        </>
    )
}

export default GroupPoster