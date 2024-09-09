import styleLoading from 'assets/styles/loading.style.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'components/Common';
import { useEffect, useRef } from 'react';
import "./header.scss";

const cx = classNames.bind(styleLoading);

interface LoadingProps {
    isLoading: boolean;
    percentProcess?: number;
    setIsUploadVideo: Function;
}

function LoadingUploadVideo({isLoading, percentProcess, setIsUploadVideo}: LoadingProps) {
    const progressRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        if(progressRef && progressRef.current) {
            progressRef.current.style.left = `-${100 - (percentProcess || 0)}%`;
        }
    }, [progressRef, percentProcess])


    if(isLoading)
        return (
            <div className={cx('loading-fixed')}>
                <div className="container">
                    <div className="progress">
                        { 
                        percentProcess === 100 ? 
                            <h2>Tải tên video thành công.</h2>
                            : <h2>Uploading {percentProcess}% ...</h2>
                        }
                        
                        <div className="container-content">
                            <div className="progress-bar__container">
                                <div className="progress-bar" ref={progressRef}>
                                </div>
                            </div>
                        </div>

                        {
                            percentProcess === 100 &&  
                            <Button
                                className="mt-2"
                                onClick={() => {
                                    setIsUploadVideo(false)
                                }}
                            >
                                Xác nhận
                            </Button>
                        }
                       
                    </div>
                </div>
            </div>
    )

    return <></>
}

export default LoadingUploadVideo