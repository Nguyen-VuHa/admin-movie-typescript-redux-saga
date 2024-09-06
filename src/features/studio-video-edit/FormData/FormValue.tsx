import { useAppDispatch, useAppSelector } from 'app/hooks';
import classNames from 'classnames/bind';
import Input from 'components/Common/Input';
import InputArea from 'components/Common/InputArea';
import InputSelectMultiple from 'components/Common/InputSelectMultiple';
import { setCategorySelectEdit } from 'reducers/movieReducer/movieSlice';
import { setDescriptionForm, setTitleForm } from 'reducers/studioVideoReducer/studioVideoSlice';
import Styles from './formdata.module.scss';

const cx = classNames.bind(Styles);

function FormValue() {
    return (
        <div>
            <div className={cx('title-form')}>THÔNG TIN CHI TIẾT</div>
            <FormGroupTitle />
            <FormGroupCategoriesSelect />
            <FormGroupDescription />
        </div>
    )
}

const FormGroupCategoriesSelect = () => {
    const { formUpload } = useAppSelector(state => state.studioVideoState);
    const { category } = formUpload;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Thể loại</div>
            <InputSelectMultiple 
                value={category}
                placeholder="-- Chọn thể loại --"
                // data={categorySelect.length > 0 ? categorySelect.map(ct => { return { value: ct.id, name: ct.category_name }}) : []}
                onChange={(value: any) => {

                }}
                onRemoveItem={(value: any) => {
                    
                }}
                // errMessage={msgCategories}
            />
        </div>
    )
}

const FormGroupTitle = () => {
    const { formUpload } = useAppSelector(state => state.studioVideoState);
    const { title } = formUpload;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Tiêu đề (bắt buộc)</div>
            <Input 
                placeholder='Nhập tiêu đề video...'
                value={title}
                onChange={(text: string) => {
                    dispatch(setTitleForm(text))
                }}
                // errMessage={msgMovieName}
            />
        </div>
    )
}

const FormGroupDescription = () => {
    const { formUpload } = useAppSelector(state => state.studioVideoState);
    const { description } = formUpload;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Mô tả (nếu có)</div>
            <InputArea 
                placeholder='Mô tả...'
                value={description}
                onChange={(text: string) => {
                    dispatch(setDescriptionForm(text));
                }}
                // errMessage={msgDescription}
            />
        </div>
    )
}

export default FormValue