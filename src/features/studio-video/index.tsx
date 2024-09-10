import classNames from 'classnames/bind';
import { MovieContextProvider } from 'contexts/MovieContext';
import globalStyles from 'utils/globalStyle.module.scss';
import Header from './Header';
import VideoList from './VideoList';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';

const gb = classNames.bind(globalStyles);

function StudioVideoMainPage() {
    const dispatch = useAppDispatch();
    const { videoParams } = useAppSelector(state => state.studioVideoState);
    const { page, pageSize, search } = videoParams

    useEffect(() => {
        
        dispatch({
            type: 'FETCH_VIDEO_LIST',
            payload: {
                page,
                pageSize,
                search
            },
        });

    }, [search, page, pageSize]);
    

    return (
        <MovieContextProvider>
            <div className={gb('container-main')}>
                <Header />
                <VideoList />
                <div style={{paddingBottom: '20px'}} />
            </div>
        </MovieContextProvider>
        
    )
}

export default StudioVideoMainPage