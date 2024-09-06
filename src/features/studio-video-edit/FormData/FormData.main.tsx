import FormValue from './FormValue'
import GroupPoster from './GroupPoster'

interface FormDataProps {
    setSelectedFile: Function;
}


function FormDataMain({ setSelectedFile }: FormDataProps) {
    return (
        <>
            <GroupPoster 
                setSelectedFile={setSelectedFile}
            />
            <FormValue />
        </>
    )
}

export default FormDataMain