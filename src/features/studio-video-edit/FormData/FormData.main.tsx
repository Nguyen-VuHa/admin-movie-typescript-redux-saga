import classNames from 'classnames';
import FormValue from './FormValue'
import GroupVideo from './GroupVideo'
import Styles from './formdata.module.scss';
import GroupPoster from './GroupPoster';

interface FormDataProps {
    setSelectedFile: Function;
}

const cx = classNames.bind(Styles);

function FormDataMain({ setSelectedFile }: FormDataProps) {
    return (
        <>
            <div className={cx('grid-col-2', ['p-2'])}>
                <GroupPoster 
                
                />
                <GroupVideo 
                    setSelectedFile={setSelectedFile}
                />
            </div>
        
            <FormValue />
        </>
    )
}

export default FormDataMain