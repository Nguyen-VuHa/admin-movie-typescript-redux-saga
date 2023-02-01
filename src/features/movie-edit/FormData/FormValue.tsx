import React from 'react'
import Styles from './formdata.module.scss';
import classNames from 'classnames/bind';
import Input from 'components/Common/Input';
import InputSelectMultiple from 'components/Common/InputSelectMultiple';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setAuthorSelectEdit, setCategorySelectEdit, setDescriptionEdit, setEndDateEdit, setIDTrailerEdit, setMainActorSelectEdit, setMovieNameEdit, setShowtimeEdit, setStartDateEdit } from 'reducers/movieReducer/movieSlice';
import InputArea from 'components/Common/InputArea';

const cx = classNames.bind(Styles);

const TYPE_AUTHOR = 'Đạo diễn';
const TYPE_MAIN_ACTOR = 'Diễn viên'

function FormValue() {
    return (
        <div>
            <div className={cx('title-form')}>THÔNG TIN PHIM</div>

            <div className={cx('grid-col-2', ['p-2'])}>
                <FormGroupMovieName />
                <FormGroupShowTime />
            </div>
            <div className={cx('grid-col-2', ['p-2'])}>
                <FormGroupStartDate />
                <FormGroupEndDate />
            </div>
            <div className={cx('grid-col-2', ['p-2'])}>
                <FormGroupAuthorSelect />
                <FormGroupMainActorSelect />
            </div>
            <div className={cx('grid-col-2', ['p-2'])}>
                <FormGroupCategoriesSelect />
                <FormGroupTraillerID />
            </div>
            <FormGroupDescription />
        </div>
    )
}

const FormGroupCategoriesSelect = () => {
    const { categorySelect } = useAppSelector(state => state.categoryState);

    const { dataEdit, msgDataEdit } = useAppSelector(state => state.movieState);
    const { categories } = dataEdit;
    const { msgCategories } = msgDataEdit;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Thể loại phim</div>
            <InputSelectMultiple 
                value={categories}
                placeholder="-- Chọn thể loại --"
                data={categorySelect.length > 0 ? categorySelect.map(ct => { return { value: ct.id, name: ct.category_name }}) : []}
                onChange={(value: any) => {
                    if(categories.findIndex(cg => cg === value) === -1)
                        dispatch(setCategorySelectEdit(categories.concat(value)));

                    if(!value) 
                        dispatch(setCategorySelectEdit([]));
                }}
                onRemoveItem={(value: any) => {
                    dispatch(setCategorySelectEdit(categories.filter(cg => cg !== value)));
                }}
                errMessage={msgCategories}
            />
        </div>
    )
}

const FormGroupMainActorSelect = () => {
    const { authorACtorSelect } = useAppSelector(state => state.authorActorState);

    const { dataEdit, msgDataEdit } = useAppSelector(state => state.movieState);
    const { mainActor } = dataEdit;
    const { msgMainActor } = msgDataEdit;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Diễn viên</div>
            <InputSelectMultiple 
                value={mainActor}
                placeholder="-- Chọn diễn viên --"
                data={authorACtorSelect && authorACtorSelect.length > 0 ?
                    authorACtorSelect.filter((ac: any) => ac.type === TYPE_MAIN_ACTOR)?.map((acs: any) => { return { value: acs.id, name: acs.name }})
                : []}
                onChange={(value: any) => {
                    if(mainActor.findIndex(at => at === value) === -1) 
                        dispatch(setMainActorSelectEdit(mainActor.concat(value)))
                    
                    if(!value)
                        dispatch(setMainActorSelectEdit([]))
                }}
                onRemoveItem={(value: any) => {
                    dispatch(setMainActorSelectEdit(mainActor.filter(at => at !== value)))
                }}
                errMessage={msgMainActor}
            />
        </div>
    )
}

const FormGroupAuthorSelect = () => {
    const { authorACtorSelect } = useAppSelector(state => state.authorActorState);

    const { dataEdit, msgDataEdit } = useAppSelector(state => state.movieState);
    const { author } = dataEdit;
    const { msgAuthor } = msgDataEdit;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Đạo diễn</div>
            <InputSelectMultiple 
                value={author}
                placeholder="-- Chọn đạo diễn --"
                data={authorACtorSelect && authorACtorSelect.length > 0 ?
                    authorACtorSelect.filter((ac: any) => ac.type === TYPE_AUTHOR)?.map((acs: any) => { return { value: acs.id, name: acs.name }})
                : []}
                onChange={(value: any) => {
                    if(author.findIndex(at => at === value) === -1)
                        dispatch(setAuthorSelectEdit(author.concat(value)))

                    if(!value)
                        dispatch(setAuthorSelectEdit([]))
                }}
                onRemoveItem={(value: any) => {
                    dispatch(setAuthorSelectEdit(author.filter(at => at !== value)))
                }}
                errMessage={msgAuthor}
            />
        </div>
    )
}

const FormGroupMovieName = () => {
    const { dataEdit, msgDataEdit } = useAppSelector(state => state.movieState);
    const { movieName } = dataEdit;
    const { msgMovieName } = msgDataEdit;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Tên phim</div>
            <Input 
                placeholder='Nhập tên phim...'
                value={movieName}
                onChange={(text: string) => {
                    dispatch(setMovieNameEdit(text));
                }}
                errMessage={msgMovieName}
            />
        </div>
    )
}

const FormGroupShowTime = () => {
    const { dataEdit, msgDataEdit } = useAppSelector(state => state.movieState);
    const { showTime } = dataEdit;
    const { msgShowtime } = msgDataEdit;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Thời lượng (phút)</div>
            <Input 
                placeholder='Nhập thời lượng...'
                value={showTime ? showTime.toString() : ''}
                onChange={(text: string) => {
                    if(text && /^\d+$/.test(text))
                        dispatch(setShowtimeEdit(parseInt(text)))
                    
                    if(!text)
                        dispatch(setShowtimeEdit(''))
                }}
                errMessage={msgShowtime}
            />
        </div>
    )
}

const FormGroupStartDate = () => {
    const { dataEdit, msgDataEdit } = useAppSelector(state => state.movieState);
    const { startDate } = dataEdit;
    const { msgStartDate } = msgDataEdit;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Ngày bắt đầu</div>
            <Input 
                type="date"
                value={startDate}
                onChange={(text: string) => {
                    dispatch(setStartDateEdit(text));
                }}
                errMessage={msgStartDate}
            />
        </div>
    )
}

const FormGroupEndDate = () => {
    const { dataEdit, msgDataEdit } = useAppSelector(state => state.movieState);
    const { endDate } = dataEdit;
    const { msgEndDate } = msgDataEdit;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Ngày kết thúc</div>
            <Input 
                type="date"
                value={endDate}
                onChange={(text: string) => {
                    dispatch(setEndDateEdit(text));
                }}
                errMessage={msgEndDate}
            />
        </div>
    )
}

const FormGroupTraillerID = () => {
    const { dataEdit, msgDataEdit } = useAppSelector(state => state.movieState);
    const { idTrailer } = dataEdit;
    const { msgIdTrailer } = msgDataEdit;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Trailer Youtube ID</div>
            <Input 
                placeholder='Nhập ID trailer youtube...'
                value={idTrailer}
                onChange={(text: string) => {
                    dispatch(setIDTrailerEdit(text));
                }}
                errMessage={msgIdTrailer}
            />
        </div>
    )
}

const FormGroupDescription = () => {
    const { dataEdit, msgDataEdit } = useAppSelector(state => state.movieState);
    const { description } = dataEdit;
    const { msgDescription } = msgDataEdit;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('form-group')}>
            <div className={cx('title-input')}>Mô tả (nếu có)</div>
            <InputArea 
                placeholder='Mô tả...'
                value={description}
                onChange={(text: string) => {
                    dispatch(setDescriptionEdit(text));
                }}
                errMessage={msgDescription}
            />
        </div>
    )
}

export default FormValue