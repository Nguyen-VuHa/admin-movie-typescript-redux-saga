import React from 'react';
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';
import InputSelect from 'components/Common/InputSelect';
import Input from 'components/Common/Input';
import InputArea from 'components/Common/InputArea';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setAddressCinema, setCinemaName, setPointLatCinema, setPointLngCinema, setSiteCinema } from 'reducers/cinemaReducer/cinemaSlice';

const cx = classNames.bind(Styles);

export const FromGroupSiteSelect = () => { 
    const dispatch = useAppDispatch();

    const { areas, dataEditCinema, msgDataEdit } = useAppSelector(state => state.cinemaState);
    const { siteCode } = dataEditCinema;
    const { msgSite } = msgDataEdit;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Khu vực</div>
            <InputSelect
                defaultItem={false}
                placeholder='-- Chọn khu vực rạp chiếu --'
                data={areas.length > 0 ? areas.map((a: any) => { return { value: a.code, name: `${a.code} - ${a.name}`}}) : []}
                value={siteCode}
                onChange={(value: string) => { 
                    let findSite = areas.filter((a: any) => a.code === value)[0]; // find `siteName` from `siteCode` selected

                    dispatch(setSiteCinema({
                        siteCode: value,
                        siteName: findSite.name
                    })) // dispatch value whenever value select changed
                }}
                errMessage={msgSite}
            />
        </div>
    )
}


export const FromGroupCinemaName = () => {
    const dispatch = useAppDispatch();

    const { dataEditCinema, msgDataEdit } = useAppSelector(state => state.cinemaState);
    const { cinemaName } = dataEditCinema;
    const { msgCinemaName } = msgDataEdit;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Tên rạp chiếu</div>
            <Input 
                placeholder='Nhập tên rạp chiếu phim...'
                value={cinemaName}
                onChange={(text: string) => {
                    dispatch(setCinemaName(text)); // dispatch text whenever input changed
                }}
                errMessage={msgCinemaName}
            />
        </div>
    )
}

export const FromGroupAddressCinema = () => {
    const dispatch = useAppDispatch();

    const { dataEditCinema, msgDataEdit } = useAppSelector(state => state.cinemaState);
    const { address } = dataEditCinema;
    const { msgAddress } = msgDataEdit;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Địa chỉ rạp chiếu</div>
            <InputArea 
                placeholder='Nhập địa chỉ rạp chiếu phim'
                value={address}
                onChange={(text: string) => {
                    dispatch(setAddressCinema(text)); // dispatch text whenever input changed
                }}  
                errMessage={msgAddress}
                minHeight={100}
            />
        </div>
    )
}


export const FromGroupPositionLng = () => {
    const dispatch = useAppDispatch();

    const { dataEditCinema } = useAppSelector(state => state.cinemaState);
    const { pointLng } = dataEditCinema;
    
    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Vị trí `lng`</div>
            <Input 
                placeholder='Nhập vị trí `lng` từ google map...'
                value={pointLng}
                onChange={(text: string) => {
                    dispatch(setPointLngCinema(text)); // dispatch text whenever input changed
                }}
            />
        </div>
    )
}


export const FromGroupPositionLat = () => {
    const dispatch = useAppDispatch();

    const { dataEditCinema } = useAppSelector(state => state.cinemaState);
    const { pointLat } = dataEditCinema;

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Vị trí `lat`</div>
            <Input 
                placeholder='Nhập vị trí `lat` từ google map...'
                value={pointLat}
                onChange={(text: string) => {
                    dispatch(setPointLatCinema(text)); // dispatch text whenever input changed
                }}
            />
        </div>
    )
}