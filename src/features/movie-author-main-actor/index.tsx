import React from 'react'
import globalStyles from 'utils/globalStyle.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import TableAuthorMainActor from './TableAuthorMainActor';

const gb = classNames.bind(globalStyles);

function MovieAuthorMainActorPage() {

    return (
        <div className={gb('container-main')}>
            <Header />
            <TableAuthorMainActor />
            <div style={{paddingBottom: '20px'}} />
        </div>
    )
}

export default MovieAuthorMainActorPage