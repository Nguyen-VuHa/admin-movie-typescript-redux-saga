import { Button } from 'components/Common';
import Modal from 'components/Common/Modal'
import React, { useCallback, useState, useEffect } from 'react'
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';
import Cropper from 'react-easy-crop';
import { Point } from 'react-easy-crop/types';
import Images from 'assets/images';
import getCroppedImg from 'utils/cropImage';

const cx = classNames.bind(Styles);

function ModalEditPoster() {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [imagePreview, setImagePreview] = useState(null);

    const onCropComplete = useCallback(async (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, []);

    useEffect(() => {
        if(croppedAreaPixels) {
            let timOut = setTimeout(() => {
                getCroppedImg("https://d1j8r0kxyu9tj8.cloudfront.net/images/1566809317niNpzY2khA3tzMg.jpg", croppedAreaPixels)
                .then((res: any) => {
                    console.log(res);
                }) 
                .catch((err: any) => {
                    console.log(err.message);
                })
            }, 500);

            return () => clearTimeout(timOut);
        }
        
    }, [croppedAreaPixels])
    

  


    return (
        <div className={cx('wrapper-modal-edit')}>
            <div className={cx('modal-edit')}>
                <div className={cx('layout-crop-image')}>
                    <div className={cx('cropper-image')}>
                        <Cropper
                            image={"https://d1j8r0kxyu9tj8.cloudfront.net/images/1566809317niNpzY2khA3tzMg.jpg"}
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
                    <img 
                        src={"https://d1j8r0kxyu9tj8.cloudfront.net/images/1566809317niNpzY2khA3tzMg.jpg"} 
                        alt="NO POSTER" 
                        width={300}
                    />
                </div>
            </div>
        </div>
        // <Modal
        //     visible={true}
        // >
        //     {/* <Modal.Header
        //         title={'Căn Chỉnh Poster'} 
        //         onHideModal={() => {
        //             // handleCloseModal();
        //         }}
        //     /> */}
        //     <Modal.Body>
        //         <div className={cx('layout-crop-image')}>
       
        //         </div>
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <Button
        //             loadingText="Đang xử lý..."
        //             onClick={() => {
        //             }}
        //         >
        //             Lưu lại
        //         </Button>
        //     </Modal.Footer>
        // </Modal>
    )
}

export default ModalEditPoster