import classNames from 'classnames/bind';
import globalStyles from 'utils/globalStyle.module.scss';
import FormDataMain from './FormData/FormData.main';
import Header from './Header/Header.main';
import { useState } from 'react';

const gb = classNames.bind(globalStyles);

function StudioVideoEditMainPage() {
    const [selectedFile, setSelectedFile] = useState<File>();

    return (
        <div className={gb('container-main')}>
            <Header 
                file={selectedFile}
            />
            <FormDataMain 
                setSelectedFile={setSelectedFile}
            />
        </div>
    )
}

export default StudioVideoEditMainPage