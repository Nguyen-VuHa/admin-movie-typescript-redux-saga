import classNames from 'classnames/bind';
import globalStyles from 'utils/globalStyle.module.scss';
import FormDataMain from './FormData/FormData.main';
import Header from './Header/Header.main';

const gb = classNames.bind(globalStyles);

function StudioVideoEditMainPage() {
    return (
        <div className={gb('container-main')}>
            <Header />
            <FormDataMain />
        </div>
    )
}

export default StudioVideoEditMainPage