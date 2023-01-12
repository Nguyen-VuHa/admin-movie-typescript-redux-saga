import React, { useState } from 'react'
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';
import Input from 'components/Common/Input';
import InputSelectMultiple from 'components/Common/InputSelectMultiple';

const cx = classNames.bind(Styles);

interface FormValueProps {

}

function FormValue({}: FormValueProps) {
    const [valueSelect, setValueSelect] = useState<Array<string>>([]);

    return (
        <div>
            <div className={cx('title-form')}>THÔNG TIN PHIM</div>

            <div className={cx('grid-col-2', ['p-2'])}>
                <div className={cx('form-group')}>
                    <div className={cx('title-input')}>Tên phim</div>
                    <Input 
                        placeholder='Nhập tên phim...'
                        value=""
                        onChange={(text: string) => {
                            console.log(text);
                        }}
                    />
                </div>
                <div className={cx('form-group')}>
                    <div className={cx('title-input')}>Thời gian (phút)</div>
                    <Input 
                        placeholder='Thời gian chiếu...'
                        value=""
                        onChange={(text: string) => {
                            console.log(text);
                        }}
                    />
                </div>
            </div>
            <div className={cx('grid-col-2', ['p-2'])}>
                <div className={cx('form-group')}>
                    <div className={cx('title-input')}>Đạo diễn</div>
                    <InputSelectMultiple 
                        value={valueSelect}
                        placeholder="-- Chọn đạo diễn --"
                        data={
                            [
                                {   
                                    value: 1,
                                    name: 'Options 1'
                                },
                                {
                                    value: 2,
                                    name: 'Options 2'
                                },
                                {
                                    value: 3,
                                    name: 'Options 3'
                                },
                                {
                                    value: 4,
                                    name: 'Options 4'
                                },
                                {
                                    value: 5,
                                    name: 'Options 5'
                                },
                                {
                                    value: 6,
                                    name: 'Options 6'
                                },
                                {
                                    value: 7,
                                    name: 'Options 7'
                                }
                            ]
                        }
                        onChange={(value: any) => {
                            let arrTemp = valueSelect;
                            if(value && arrTemp.findIndex(arr => arr === value.toString()) === -1) {
                                arrTemp = arrTemp.concat(value.toString());
                                setValueSelect(arrTemp);
                            } 
                            
                            if(!value) {
                                setValueSelect([]);
                            }
                        }}
                        onRemoveItem={(value: any) => {
                            setValueSelect(valueSelect.filter(v => v != value));
                        }}
                    />
                </div>
                <div className={cx('form-group')}>
                    <div className={cx('title-input')}>Diễn viên</div>
                    <InputSelectMultiple 
                        value={valueSelect}
                        placeholder="-- Chọn diễn viên --"
                        data={
                            [
                                {   
                                    value: 1,
                                    name: 'Options 1'
                                },
                                {
                                    value: 2,
                                    name: 'Options 2'
                                },
                                {
                                    value: 3,
                                    name: 'Options 3'
                                },
                                {
                                    value: 4,
                                    name: 'Options 4'
                                },
                                {
                                    value: 5,
                                    name: 'Options 5'
                                },
                                {
                                    value: 6,
                                    name: 'Options 6'
                                },
                                {
                                    value: 7,
                                    name: 'Options 7'
                                }
                            ]
                        }
                        onChange={(value: any) => {
                            let arrTemp = valueSelect;
                            if(value && arrTemp.findIndex(arr => arr === value.toString()) === -1) {
                                arrTemp = arrTemp.concat(value.toString());
                                setValueSelect(arrTemp);
                            } 
                            
                            if(!value) {
                                setValueSelect([]);
                            }
                        }}
                        onRemoveItem={(value: any) => {
                            setValueSelect(valueSelect.filter(v => v != value));
                        }}
                    />
                </div>
            </div>
            <div className={cx('grid-col-2', ['p-2'])}>
            <div className={cx('form-group')}>
                    <div className={cx('title-input')}>Thể loại phim</div>
                    <InputSelectMultiple 
                        value={valueSelect}
                        placeholder="-- Chọn diễn viên --"
                        data={
                            [
                                {   
                                    value: 1,
                                    name: 'Options 1'
                                },
                                {
                                    value: 2,
                                    name: 'Options 2'
                                },
                                {
                                    value: 3,
                                    name: 'Options 3'
                                },
                                {
                                    value: 4,
                                    name: 'Options 4'
                                },
                                {
                                    value: 5,
                                    name: 'Options 5'
                                },
                                {
                                    value: 6,
                                    name: 'Options 6'
                                },
                                {
                                    value: 7,
                                    name: 'Options 7'
                                }
                            ]
                        }
                        onChange={(value: any) => {
                            let arrTemp = valueSelect;
                            if(value && arrTemp.findIndex(arr => arr === value.toString()) === -1) {
                                arrTemp = arrTemp.concat(value.toString());
                                setValueSelect(arrTemp);
                            } 
                            
                            if(!value) {
                                setValueSelect([]);
                            }
                        }}
                        onRemoveItem={(value: any) => {
                            setValueSelect(valueSelect.filter(v => v != value));
                        }}
                    />
                </div>
                <div className={cx('form-group')}>
                    <div className={cx('title-input')}>Trailer Youtube ID</div>
                    <Input 
                        placeholder='Trailer Youtube ID'
                        value=""
                        onChange={(text: string) => {
                            console.log(text);
                        }}
                    />
                </div>
            </div>
            
            <div className={cx('form-group')}>
                <div className={cx('title-input')}>Mô tả (nếu có)</div>
                <Input 
                    placeholder='Mô tả...'
                    value=""
                    onChange={(text: string) => {
                        console.log(text);
                    }}
                />
            </div>
        </div>
    )
}

export default FormValue