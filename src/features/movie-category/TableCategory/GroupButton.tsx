import { useAppDispatch } from 'app/hooks';
import { ButtonTable } from 'components/Common'
import ModalQuestion from 'components/Common/ModalQuestion';
import COLORS from 'constants/colors';
import { ModalContext } from 'contexts/ModalContext';
import React, { useContext, useState } from 'react';
import { IoLockOpen, IoLockClosed, IoCreate, IoTrashSharp } from "react-icons/io5";
import { setDataUpdateCategory, updateStatusCategory } from 'reducers/categoryReducer/categorySlice';

interface GroupButtonProps {
    status: number,
    data: any,
}

const TITLE_MODAL_UPDATE_STATUS = "Xác Nhận"
const TEXT_MODAL_UPDATE_STATUS = "Bạn có chắc muốn thay đổi trạng thái không?"


function GroupButton({ status, data }: GroupButtonProps) {
    const dispatch = useAppDispatch();
    const { setModalEditCate } = useContext(ModalContext);

    const [statusQesModal, setStatusQesModal] = useState<boolean>(false)

    const handleUpdateStatus = () => {
        dispatch({
            type: 'UPDATE_STATUS_CATEGORY',
            payload: {
                id: data.id,
                status: data.status
            }
        });
        setStatusQesModal(false);
    }
    return (
        <>
            {/* Modal Update Status Category */}
            <ModalQuestion 
                title={TITLE_MODAL_UPDATE_STATUS}
                textConfirm={TEXT_MODAL_UPDATE_STATUS}
                status={statusQesModal}
                onClose={() => setStatusQesModal(false)}
                onSave={() => {
                    handleUpdateStatus();
                }}
            />

            {/* ------------------------------- */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
            >
                <ButtonTable 
                    icon={
                        status === 1 ? <IoLockClosed /> :  <IoLockOpen />
                    }
                    color={status === 1 ? COLORS.ORANGE_WARN : COLORS.GREEN_SUCCESS}
                    onClick={() => {
                        setStatusQesModal(true);
                    }}
                />
                <ButtonTable 
                    icon={
                        <IoCreate />
                    }
                    color={COLORS.BLUE_INFO}
                    onClick={() => {
                        dispatch(setDataUpdateCategory({
                            id: data.id,
                            name: data.category_name,
                        }))

                        setModalEditCate(true);
                    }}
                />
                <ButtonTable 
                    icon={
                        <IoTrashSharp />
                    }
                    color={COLORS.RED_ERROR}
                />
            </div>
        </>
    )
}

export default GroupButton