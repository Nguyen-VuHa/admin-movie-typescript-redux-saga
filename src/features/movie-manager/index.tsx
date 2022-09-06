import React from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';

const gb = classNames.bind(globalStyles);

function MovieManagerPage() {
    return (
        <div className={gb('container-main')}>
            <Header />
            {/* <div style={{height: '120vh'}}>

            </div> */}
        </div>
    )
}

export default MovieManagerPage