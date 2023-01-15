import React, { useState } from 'react'
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';
import Input from 'components/Common/Input';
import InputSelectMultiple from 'components/Common/InputSelectMultiple';
import { useAppSelector } from 'app/hooks';

const cx = classNames.bind(Styles);

interface FormValueProps {

}

function FormValue({}: FormValueProps) {
    const [valueSelect, setValueSelect] = useState<Array<string>>([]);

    const { authorACtorSelect } = useAppSelector(state => state.authorActorState);
    const { categorySelect } = useAppSelector(state => state.categoryState);

    console.log(categorySelect);
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
                        data={authorACtorSelect && authorACtorSelect.length > 0 ?
                            authorACtorSelect.filter((ac: any) => ac.type === 'Đạo diễn')?.map((acs: any) => { return { value: acs.id, name: acs.name }})
                        : []}
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
                        data={authorACtorSelect && authorACtorSelect.length > 0 ?
                            authorACtorSelect.filter((ac: any) => ac.type === 'Diễn viên')?.map((acs: any) => { return { value: acs.id, name: acs.name }})
                        : []}
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
                        placeholder="-- Chọn thể loại --"
                        data={categorySelect.length > 0 ? categorySelect.map(ct => { return { value: ct.id, name: ct.category_name }}) : []}
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