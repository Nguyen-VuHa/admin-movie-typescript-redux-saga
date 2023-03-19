import React from 'react';
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';
import InputSelect from 'components/Common/InputSelect';
import Input from 'components/Common/Input';
import InputArea from 'components/Common/InputArea';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setAddressCinema, setCinemaName, setPointLatCinema, setPointLngCinema, setSiteCinema } from 'reducers/cinemaReducer/cinemaSlice';
import InputSelectFetchData from 'components/Common/InputSelectFetchData';

const cx = classNames.bind(Styles);

export const FromGroupMovieSelect = () => { 
    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Phim sắp chiếu</div>
            <InputSelectFetchData 
                defaultItem={false}
                placeholder='-- Chọn phim sắp chiếu cho suất chiếu --'
                url={'api/select/movie'}
                value={''}
                onChange={(value: string) => { 
                   console.log(value);
                }}
                errMessage={''}
            />
        </div>
    )
}

export const FromGroupSiteSelect = () => { 
    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Khu vực</div>
            <InputSelectFetchData 
                defaultItem={false}
                placeholder='-- Chọn khu vực cho suất chiếu --'
                url={'api/select/site'}
                value={''}
                onChange={(value: string) => { 
                   console.log(value);
                }}
                errMessage={''}
            />
        </div>
    )
}

export const FromGroupCinemaSelect = () => { 
    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Rạp chiếu</div>
            <InputSelectFetchData 
                defaultItem={false}
                placeholder='-- Chọn rạp chiếu cho suất chiếu --'
                url={'api/select/cinema'}
                value={''}
                onChange={(value: string) => { 
                   console.log(value);
                }}
                errMessage={''}
            />
        </div>
    )
}

export const FromGroupRoomSelect = () => { 
    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Phòng chiếu</div>
            <InputSelectFetchData 
                defaultItem={false}
                placeholder='-- Chọn phòng chiếu cho suất chiếu --'
                url={'api/select/rooms'}
                value={''}
                onChange={(value: string) => { 
                   console.log(value);
                }}
                errMessage={''}
            />
        </div>
    )
}


export const FromGroupShowTime = () => {
    
    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Thời gian chiếu</div>
            <Input 
                placeholder=''
                value={''}
                onChange={(text: string) => {
                  
                }}
                type="date"
                errMessage={''}
            />
        </div>
    )
}

export const FromGroupFareShowTime = () => {
   
    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Giá vé cho suất chiếu</div>
            <Input 
                placeholder='Nhập giá vé cho suất chiếu...'
                value={''}
                onChange={(text: string) => {
                  
                }}
                errMessage={''}
            />
        </div>
    )
}


export const FormGroupDescription = () => {
    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Mô tả (nếu có)</div>
            <InputArea 
                placeholder='Mô tả...'
                value={''}
                onChange={(text: string) => {

                }}
                errMessage={''}
            />
        </div>
    )
}