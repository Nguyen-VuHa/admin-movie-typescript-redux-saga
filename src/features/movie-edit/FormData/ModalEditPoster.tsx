import { Button } from 'components/Common';
import React, { useCallback, useState, useEffect } from 'react'
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';
import Cropper from 'react-easy-crop';
import { Point } from 'react-easy-crop/types';
import getCroppedImg from 'utils/cropImage';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setDefaultImageEdit, setListPoster, setModalEditImage } from 'reducers/movieReducer/movieSlice';

const cx = classNames.bind(Styles);

function ModalEditPoster() {
    const dispatch = useAppDispatch();

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [imagePreview, setImagePreview] = useState<string>("");
    const [imageBase64, setImageBase64] = useState<string>("");

    const { modalEditImg, imgBase64, listPoster } = useAppSelector(state => state.movieState);

    const onCropComplete = useCallback(async (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, []);

    useEffect(() => {
        if(croppedAreaPixels) {
            let timOut = setTimeout(() => {
                getCroppedImg(imgBase64, croppedAreaPixels)
                .then((res: any) => {
                    setImageBase64(res);

                    fetch(res)
                    .then(res => res.blob())
                    .then((blobData) => {
                        const imageFromBlob = URL.createObjectURL(blobData);
                        setImagePreview(imageFromBlob);
                    });
                }) 
                .catch((err: any) => {
                    console.log(err.message);
                })
            }, 300);

            return () => clearTimeout(timOut);
        }
        
    }, [croppedAreaPixels]);


    const handleCloseModal = () => {
        dispatch(setModalEditImage(false));
        dispatch(setDefaultImageEdit());
        setImagePreview('');
        setImageBase64('');
    }

    return (
        <div className={cx('wrapper-modal-edit', [modalEditImg && "open"])}>
            <div className={cx('modal-edit')}>
                <div className={cx('layout-crop-image')}>
                    <div className={cx('cropper-image')}>
                        <Cropper
                            image={imgBase64}
                            crop={crop}
                            zoom={zoom}
                            minZoom={1}
                            aspect={27 / 40}
                            zoomSpeed={0.2}
                            cropShape="rect"
                            showGrid={false}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                </div>
                <div className={cx('layout-preview')}>
                    <div>
                        {
                            imagePreview && <img 
                                src={imagePreview} 
                                alt="NO POSTER" 
                                width={300}
                            />
                        }
                    </div>
                    <div className='d-flex w-100'>
                        <Button
                            onClick={() => {
                                handleCloseModal();
                            }}
                        >
                            Thoát chỉnh sửa
                        </Button>
                        <Button
                            onClick={() => {
                                if(imageBase64) {
                                    dispatch(setListPoster({
                                        id: listPoster.length + 1,
                                        base64: imageBase64,
                                    }));
    
                                    handleCloseModal();
                                }
                            }}
                        >
                            Lưu lại
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditPoster