import { useAppDispatch } from 'app/hooks'
import ModalQuestion from 'components/Common/ModalQuestion'
import { MovieContext } from 'contexts/MovieContext'
import React, { useContext, useCallback } from 'react'

const TITLE_CONFIRM = "Xác Nhận"
const TEXT_MODAL_UPDATE_STATUS = "Bạn có chắc muốn thay đổi trạng thái không?"

function WrapperModal() {
    const dispatch = useAppDispatch();
    const { movieState, dispatchMovie } = useContext(MovieContext);
    const { statusModalQuestion, movieId } = movieState;

    const handeCloseModal = useCallback(() => {
        dispatchMovie({
            type: 'SET_STATUS_MODAL_QUESTION',
            payload: false
        });

        dispatchMovie({
            type: "SET_MOVIE_ID_UPDATE",
            payload: null,
        });
    },[])
    

    return (
        <>
            {/* Modal Question Exchange Status */}
            <ModalQuestion 
                title={TITLE_CONFIRM}
                textConfirm={TEXT_MODAL_UPDATE_STATUS}
                status={statusModalQuestion}
                onClose={() => {
                    handeCloseModal();
                }}
                onSave={() => {
                    if(movieId) {
                        dispatch({
                            type: "CHANGE_STATUS_MOVIE",
                            payload: movieId,
                        });

                        handeCloseModal();
                    }
                }}
            />
        </>
    )
}

export default WrapperModal