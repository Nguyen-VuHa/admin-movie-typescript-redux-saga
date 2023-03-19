import React from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header/Header.main';
import FormDataMain from './FormData/FormData.main';

const gb = classNames.bind(globalStyles);

function ShowTimeEditPage() {
    return (
        <div className={gb('container-main')}>
            <Header />
            <FormDataMain />
        </div>
    )
}

export default ShowTimeEditPage