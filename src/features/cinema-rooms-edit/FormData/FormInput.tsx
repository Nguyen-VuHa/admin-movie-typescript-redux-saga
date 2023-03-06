import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import classNames from 'classnames/bind';
import Input from 'components/Common/Input';
import InputArea from 'components/Common/InputArea';
import InputSelect from 'components/Common/InputSelect';
import { setAddressCinema, setDataSelectSite, setFormHorizontalSize, setFormRoomName, setFormRoomType, setFormVerticalSize, setPointLatCinema, setPointLngCinema, setFormCinemaId } from 'reducers/cinemaReducer/cinemaSlice';
import Styles from './formdata.module.scss';
import { handleCheckIsNumber } from 'utils/checkIsNumber';

const cx = classNames.bind(Styles);

export const FromGroupSiteSelect = () => { 
    const dispatch = useAppDispatch();

    const { sites, selectSite } = useAppSelector(state => state.cinemaState);

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Khu vực hiện hành</div>
            <InputSelect
                defaultItem={false}
                placeholder='-- Chọn khu vực rạp chiếu --'
                data={sites.length > 0 ? sites.map((a: any) => { return { value: a.id, name: `${a.code} - ${a.siteName}`}}) : []}
                value={selectSite}
                onChange={(value: string) => { 
                    dispatch(setDataSelectSite(value));
                }}
                errMessage={''}
            />
        </div>
    )
}


export const FromGroupCinemaSelect = () => {
    const dispatch = useAppDispatch();

    const { cinemaCombobox, dataEditRooms, msgDataEditRoom } = useAppSelector(state => state.cinemaState);
    const { cinemaId } = dataEditRooms;
    const { msgCinemaId } = msgDataEditRoom;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Cụm rạp phim</div>
            <InputSelect
                defaultItem={false}
                placeholder='-- Chọn cụm rạp chiếu --'
                data={cinemaCombobox.length > 0 ? cinemaCombobox.map((c: any) => { return { value: c.id, name: c.cinemaName}}) : []}
                value={cinemaId}
                onChange={(value: string) => { 
                    dispatch(setFormCinemaId(value))
                }}
                errMessage={msgCinemaId}
            />
        </div>
    )
}

export const FromGroupRoomName = () => {
    const dispatch = useAppDispatch();

    const { dataEditRooms, msgDataEditRoom } = useAppSelector(state => state.cinemaState);
    const { roomName } = dataEditRooms;
    const { msgRoomName } = msgDataEditRoom;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Phòng chiếu</div>
            <Input 
                placeholder='Nhập phòng chiếu cho cụm rạp hiện hành'
                value={roomName}
                onChange={(text: string) => {
                    dispatch(setFormRoomName(text)); // dispatch text whenever input changed
                }}  
                errMessage={msgRoomName}
            />
        </div>
    )
}

export const FromGroupRoomType = () => {
    const dispatch = useAppDispatch();

    const { dataEditRooms, msgDataEditRoom } = useAppSelector(state => state.cinemaState);
    const { type } = dataEditRooms;
    const { msgRoomType } = msgDataEditRoom;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Loại phòng chiếu</div>
            <Input 
                placeholder='Nhập loại phòng chiếu cho cụm rạp hiện hành'
                value={type}
                onChange={(text: string) => {
                    dispatch(setFormRoomType(text)); // dispatch text whenever input changed
                }}  
                errMessage={msgRoomType}
            />
        </div>
    )
}


export const FromGroupHorizontalSize = () => {
    const dispatch = useAppDispatch();

    const { dataEditRooms, msgDataEditRoom } = useAppSelector(state => state.cinemaState);
    const { horizontalSize } = dataEditRooms;
    const { msgHorizontalSize } = msgDataEditRoom;
    
    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Kích thước chiều ngang</div>
            <Input 
                placeholder='Nhập kích thước chiều ngang tương ứng'
                value={horizontalSize ? horizontalSize.toString() : ''}
                onChange={(text: string) => {
                    if(text && handleCheckIsNumber(text))
                        dispatch(setFormHorizontalSize(text)); // dispatch text whenever input changed

                    if(!text)
                        dispatch(setFormHorizontalSize(0)); // dispatch text whenever input changed
                }}
                errMessage={msgHorizontalSize}
            />
        </div>
    )
}


export const FromGroupVerticalSize = () => {
    const dispatch = useAppDispatch();

    const { dataEditRooms, msgDataEditRoom } = useAppSelector(state => state.cinemaState);
    const { verticalSize } = dataEditRooms;
    const { msgVerticalSize } = msgDataEditRoom;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Kích thước chiều dọc</div>
            <Input 
                placeholder='Nhập kích thước chiều dọc tương ứng'
                value={verticalSize ? verticalSize.toString() : ''}
                onChange={(text: string) => {
                    if(text && handleCheckIsNumber(text))
                        dispatch(setFormVerticalSize(text)); // dispatch text whenever input changed

                    if(!text)
                        dispatch(setFormVerticalSize(0)); // dispatch text whenever input changed
                }}
                errMessage={msgVerticalSize}
            />
        </div>
    )
}