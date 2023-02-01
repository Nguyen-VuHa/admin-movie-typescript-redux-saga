import React from 'react'
import classNames from 'classnames/bind';
import styleLoading from 'assets/styles/loading.style.module.scss';
import { ProgressBar } from 'react-loader-spinner';
import COLORS from 'constants/colors';
import { useAppSelector } from 'app/hooks';

const cx = classNames.bind(styleLoading);

function LoadingFullScreem() {
    const { loadingFullScreen } = useAppSelector(state => state.globalState);

    if(loadingFullScreen)
        return (
            <div className={cx('loading-full-s')}>
                <div>
                    <ProgressBar
                        height="100"
                        width="100"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass="progress-bar-wrapper"
                        borderColor = {COLORS.YELLOW_PRIMARY}
                        barColor = {COLORS.YELLOW_PRIMARY}
                    />
                </div>
            </div>
        )

    return <></>
}

export default LoadingFullScreem