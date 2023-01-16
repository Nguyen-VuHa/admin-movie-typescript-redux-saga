import { useAppDispatch } from 'app/hooks'
import ModalQuestion from 'components/Common/ModalQuestion'
import { AuthorActorContext } from 'contexts/AuthorActorContext'
import React, { useContext } from 'react'

const TITLE_CONFIRM = "Xác Nhận"
const TEXT_MODAL_DELETED_ITEM = "Bạn có chắc muốn xóa đạo diễn / diễn viên này không?"

function WrapperModal() {
    const dispatch = useAppDispatch();

    const { stateAT, dispatchAT } = useContext(AuthorActorContext);
    const { askDeletedModal, dataDeleted } = stateAT;

    const handleDeleteItem = () => {
        dispatch({
            type: 'DELETED_AUTHOR_ACTOR',
            payload: dataDeleted,
        });

        dispatchAT({
            type: 'SET_ASK_DELETED_MODAL',
            payload: false,
        })

        dispatchAT({
            type: 'SET_DATA_DELETED_MODAL',
            payload: null,
        })
    }

    return (
        <>
            {/* Modal Question Deleted Item */}
            <ModalQuestion 
                title={TITLE_CONFIRM}
                textConfirm={TEXT_MODAL_DELETED_ITEM}
                status={askDeletedModal}
                onClose={() => {
                    dispatchAT({
                        type: 'SET_ASK_DELETED_MODAL',
                        payload: false,
                    })
                }}
                onSave={() => {
                    handleDeleteItem();
                }}
            />
        </>
    )
}

export default WrapperModal