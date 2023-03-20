import React from 'react';
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';
import Input from 'components/Common/Input';
import InputArea from 'components/Common/InputArea';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import InputSelectFetchData from 'components/Common/InputSelectFetchData';
import { STR_API_SELECTED_CINEMA, STR_API_SELECTED_MOVIE, STR_API_SELECTED_ROOM, STR_API_SELECTED_SITE } from 'constants/globalConstant';
import { setCinemaSelectedEdit, setFareShowTimeEdit, setMovieEdit, setRoomEdit, setShowTimeEdit, setSiteSelectedEdit, setDescriptionEdit } from 'reducers/showtimeReducer/showtimeSlice';
import { handleCheckIsNumber } from 'utils/checkIsNumber';
import moment from 'moment';
import { formatCash } from 'utils/currencyFormat';

const cx = classNames.bind(Styles);

export const FromGroupMovieSelect = () => { 
    const dispatch = useAppDispatch();

    const { dataEdit, msgDataEdit } = useAppSelector(state => state.showtimeState);
    const { movieId } = dataEdit;
    const { msgMovieId } = msgDataEdit;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Phim sắp chiếu</div>
            <InputSelectFetchData 
                defaultItem={false}
                placeholder='-- Chọn phim sắp chiếu cho suất chiếu --'
                url={STR_API_SELECTED_MOVIE}
                value={movieId}
                onChange={(value: string) => { 
                    dispatch(setMovieEdit(value));
                }}
                errMessage={msgMovieId}
            />
        </div>
    )
}

export const FromGroupSiteSelect = () => { 
    const dispatch = useAppDispatch();

    const { siteSelectEdit } = useAppSelector(state => state.showtimeState);

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Khu vực</div>
            <InputSelectFetchData 
                defaultItem={false}
                placeholder='-- Chọn khu vực cho suất chiếu --'
                url={STR_API_SELECTED_SITE}
                value={siteSelectEdit}
                onChange={(value: string) => { 
                    dispatch(setSiteSelectedEdit(value));
                }}
                errMessage={''}
            />
        </div>
    )
}

export const FromGroupCinemaSelect = () => { 
    const dispatch = useAppDispatch();

    const { cinemaSelectEdit, siteSelectEdit } = useAppSelector(state => state.showtimeState);

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Rạp chiếu</div>
            <InputSelectFetchData 
                defaultItem={false}
                placeholder='-- Chọn rạp chiếu cho suất chiếu --'
                url={siteSelectEdit ? STR_API_SELECTED_CINEMA : ''}
                propsParams={{ _site_id: siteSelectEdit }}
                value={cinemaSelectEdit}
                onChange={(value: string) => { 
                    dispatch(setCinemaSelectedEdit(value));
                }}
                errMessage={''}
            />
        </div>
    )
}

export const FromGroupRoomSelect = () => { 
    const dispatch = useAppDispatch();

    const { cinemaSelectEdit, dataEdit, msgDataEdit } = useAppSelector(state => state.showtimeState);
    const { roomId } = dataEdit;
    const { msgRoomId } = msgDataEdit;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Phòng chiếu</div>
            <InputSelectFetchData 
                defaultItem={false}
                placeholder='-- Chọn phòng chiếu cho suất chiếu --'
                url={cinemaSelectEdit ? STR_API_SELECTED_ROOM : ''}
                propsParams={{ _cinema_id: cinemaSelectEdit }}
                value={roomId}
                onChange={(value: string) => { 
                    dispatch(setRoomEdit(value));
                }}
                errMessage={msgRoomId}
            />
        </div>
    )
}


export const FromGroupShowTime = () => {
    const dispatch = useAppDispatch();

    const { dataEdit, msgDataEdit } = useAppSelector(state => state.showtimeState);
    const { showtime } = dataEdit;
    const { msgShowtime } = msgDataEdit;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Thời gian chiếu</div>
            <Input 
                value={showtime.toString()}
                onChange={(text: string) => {
                    console.log(moment(text).format('YYYY-MM-DD HH:mm'));
                    dispatch(setShowTimeEdit(moment(text).format('YYYY-MM-DD HH:mm')))
                }}
                type="datetime-local"
                errMessage={msgShowtime}
            />
        </div>
    )
}

export const FromGroupFareShowTime = () => {
    const dispatch = useAppDispatch();

    const { dataEdit, msgDataEdit } = useAppSelector(state => state.showtimeState);
    const { fare } = dataEdit;
    const { msgFare } = msgDataEdit;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Giá vé cho suất chiếu</div>
            <Input 
                placeholder='Nhập giá vé cho suất chiếu...'
                value={fare ? formatCash(fare.toString()) : ''}
                onChange={(text: string) => {
                    if(text && handleCheckIsNumber(text.replaceAll(',', '')))
                        dispatch(setFareShowTimeEdit(parseInt(text.replaceAll(',', ''))))
                    
                    if(!text)
                        dispatch(setFareShowTimeEdit(''))
                }}
                errMessage={msgFare}
            />
        </div>
    )
}


export const FormGroupDescription = () => {
    const dispatch = useAppDispatch();

    const { dataEdit } = useAppSelector(state => state.showtimeState);
    const { description } = dataEdit;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Mô tả (nếu có)</div>
            <InputArea 
                placeholder='Mô tả...'
                value={description}
                onChange={(text: string) => {
                    dispatch(setDescriptionEdit(text));
                }}
                errMessage={''}
            />
        </div>
    )
}