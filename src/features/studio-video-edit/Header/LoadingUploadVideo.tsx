import styleLoading from 'assets/styles/loading.style.module.scss';
import classNames from 'classnames/bind';
import "./header.scss"
import { useEffect, useRef, useState } from 'react';
import { Button } from 'components/Common';

const cx = classNames.bind(styleLoading);

interface LoadingProps {
    isLoading: boolean;
    percentProcess?: number;
}

function LoadingUploadVideo({isLoading, percentProcess}: LoadingProps) {
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
                            <h2>Upload video successfully.</h2>
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