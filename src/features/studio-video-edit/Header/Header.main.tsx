import { apiGetSignUploadVide, apiUploadVideoFile } from 'api/mediaApi';
import Styles from 'assets/styles/header.style.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'components/Common';
import ModalQuestion from 'components/Common/ModalQuestion';
import useToastify from 'hooks/useToastify';
import { useState } from 'react';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoCaretBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import GlobalStyles from 'utils/globalStyle.module.scss';
import LoadingUploadVideo from './LoadingUploadVideo';
import { useAppSelector } from 'app/hooks';

const gb = classNames.bind(GlobalStyles);
const cx = classNames.bind(Styles);

interface HeaderProps {
    file: File | undefined;
}

const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB per chunk

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


function Header({ file }: HeaderProps) {
    const { formUpload, thumbnailsBase64 } = useAppSelector(state => state.studioVideoState);
    const { title, description  } = formUpload;

    const navigate = useNavigate();
    const[isUploadVideo, setIsUploadVideo] = useState<boolean>(false)

    const dispatchToast = useToastify();

    const [modalConfirm, setModalConfirm] = useState<boolean>(false)
    const [process, setProcess] = useState<number>(0)

    const handleSubmitFormMovie = () => {
        if(file && thumbnailsBase64 && title) {
            setModalConfirm(true);
        } else {
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    position: 'top-left',
                    message: 'Vui lòng hoàn tất biểu mẩu upload video.'
                }
            })
        }
    }

    const handleUploadFile = async () => {
        if(file && thumbnailsBase64 && title) {
            const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

            let currentChunk = 0;

            let signRes = await apiGetSignUploadVide()

            if (signRes.code !== 200) {
                dispatchToast({
                    type: 'TYPE_ERROR',
                    payload: {
                        position: 'top-left',
                        message: 'Tải video thất bại. Vui lòng thử lại sau ít phút'
                    }
                })

                return
            }

            let signRHex =  signRes.data.r_sign_hex
            let signSHex =  signRes.data.s_sign_hex
            let uploadID =  signRes.data.upload_id
            

            while (currentChunk < totalChunks) {
                const start = currentChunk * CHUNK_SIZE;
                const end = Math.min(file.size, start + CHUNK_SIZE);
                const chunk = file.slice(start, end);
    
                const formData = new FormData();
                formData.append("file", chunk);
                formData.append("chunkNumber", (currentChunk + 1).toString());
                formData.append("totalChunks", totalChunks.toString());
                formData.append("r_sign_hex", signRHex);
                formData.append("s_sign_hex", signSHex);
                formData.append("upload_id", uploadID);

                console.log(currentChunk === totalChunks - 1);
                
                if (currentChunk === totalChunks - 1) {
                    formData.append("filename", title);
                    formData.append("thumbnail", thumbnailsBase64);
                    formData.append("description", description);
                }
    
                const res = await apiUploadVideoFile(formData)
                
                if (res && res.code !== 200) {
                    currentChunk = totalChunks + 1
                    setIsUploadVideo(false)
                    setProcess(0);
                    continue
                }

                currentChunk++;
                const progress = Math.round((currentChunk / totalChunks) * 100);
                setProcess(progress);
            }


        } else {
            dispatchToast({
                type: 'TYPE_ERROR',
                payload: {
                    position: 'top-left',
                    message: 'Vui lòng hoàn tất biểu mẩu upload video.'
                }
            })
        }
    }



    return (
       <>
            <LoadingUploadVideo 
                isLoading={isUploadVideo}
                percentProcess={process}
                setIsUploadVideo={setIsUploadVideo}
            />
            <div className={gb('wrapper-header', cx('sticky-header'))}>
                {
                    modalConfirm && <ModalQuestion 
                        status={modalConfirm}
                        title="THÔNG BÁO"
                        textConfirm={'Quá trình này có thể xảy ra lâu!' + '\n' + 'Vui lòng không tắt trình duyệt khi đang thực hiện.'}
                        onClose={() => {
                            setModalConfirm(false);
                        }}
                        onSave={() => {
                            setIsUploadVideo(true)
                            setModalConfirm(false)
                            handleUploadFile()
                        }}
                    />
                }
                
                <div className={gb('header')}>
                    <div
                        className={cx('layout-title')}
                    >
                        <Button
                            onClick={() => navigate(-1)}
                            style={{width: '45px', height: '45px', marginLeft: 'auto', padding: 0}}
                            title="Quay lại"
                        >
                            <IoCaretBack size={18}/>
                        </Button>
                        <h2 className={cx('title', ['ml-1'])}>
                            Tải lên video
                        </h2>
                    </div>
                    <div
                        className={cx('layout-title')}
                        style={{width: 'auto', alignItems: 'flex-start'}}
                    >
                        <Button
                            onClick={() => handleSubmitFormMovie()}
                        >
                            Lưu Video
                            <AiOutlineCloudUpload size={18} style={{ marginLeft: '8px' }}/>
                        </Button>
                    </div>
                </div>
            </div>
       </>
    )
}

export default Header