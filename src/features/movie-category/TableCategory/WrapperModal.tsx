import { useAppDispatch } from 'app/hooks'
import ModalQuestion from 'components/Common/ModalQuestion'
import { CategoryContext } from 'contexts/CategoryContext'
import React, { useContext } from 'react'

const TITLE_CONFIRM = "Xác Nhận"
const TEXT_MODAL_UPDATE_STATUS = "Bạn có chắc muốn thay đổi trạng thái không?"

const TEXT_MODAL_DELETED_ITEM = "Bạn có chắc muốn xóa thể loại này không?"

function WrapperModal() {
    const dispatch = useAppDispatch();

    const { stateCate, dispatchCate } = useContext(CategoryContext);
    const { statusQuestionModal, dataUpdateStatus, askDeletedModal, dataDeleted } = stateCate;

    const handleUpdateStatus = () => {
        dispatch({
            type: 'UPDATE_STATUS_CATEGORY',
            payload: {
                id: dataUpdateStatus && dataUpdateStatus.id,
                status: dataUpdateStatus && dataUpdateStatus.status
            }
        });

        dispatchCate({
            type: 'SET_STATUS_MODAL_QUESTION',
            payload: false,
        })

        dispatchCate({
            type: 'SET_DATA_UPDATE_STATUS_MODAL_QUESTION',
            payload: null,
        })
    }

    const handleDeleteItem = () => {
        dispatch({
            type: 'DELETE_CATEGORY',
            payload: dataDeleted,
        });

        dispatchCate({
            type: 'SET_ASK_DELETED_MODAL',
            payload: false,
        })

        dispatchCate({
            type: 'SET_DATA_DELETED_MODAL',
            payload: null,
        })
    }

    return (
        <>
            {/* Modal Question Update Status */}
            <ModalQuestion 
                title={TITLE_CONFIRM}
                textConfirm={TEXT_MODAL_UPDATE_STATUS}
                status={statusQuestionModal}
                onClose={() => {
                    dispatchCate({
                        type: 'SET_STATUS_MODAL_QUESTION',
                        payload: false,
                    })
                }}
                onSave={() => {
                    handleUpdateStatus();
                }}
            />

            {/* Modal Question Deleted Item */}
            <ModalQuestion 
                title={TITLE_CONFIRM}
                textConfirm={TEXT_MODAL_DELETED_ITEM}
                status={askDeletedModal}
                onClose={() => {
                    dispatchCate({
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