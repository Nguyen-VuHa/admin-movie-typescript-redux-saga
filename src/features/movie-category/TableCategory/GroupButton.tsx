import { useAppDispatch } from 'app/hooks';
import { ButtonTable } from 'components/Common'
import COLORS from 'constants/colors';
import { CategoryContext } from 'contexts/CategoryContext';
import { ModalContext } from 'contexts/ModalContext';
import React, { useContext } from 'react';
import { IoLockOpen, IoLockClosed, IoCreate, IoTrashSharp } from "react-icons/io5";
import { setDataUpdateCategory } from 'reducers/categoryReducer/categorySlice';

interface GroupButtonProps {
    status: number,
    data: any,
}

function GroupButton({ status, data }: GroupButtonProps) {
    const dispatch = useAppDispatch();
    const { setModalEditCate } = useContext(ModalContext);
    const { dispatchCate } = useContext(CategoryContext);

    return (
        <>
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
                        dispatchCate({
                            type: 'SET_STATUS_MODAL_QUESTION',
                            payload: true,
                        })

                        dispatchCate({
                            type: 'SET_DATA_UPDATE_STATUS_MODAL_QUESTION',
                            payload: { 
                                id: data.id, 
                                status: data.status 
                            },
                        })
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
                    onClick={() => {
                        dispatchCate({
                            type: 'SET_ASK_DELETED_MODAL',
                            payload: true,
                        })

                        dispatchCate({
                            type: 'SET_DATA_DELETED_MODAL',
                            payload: data.id,
                        })
                    }}
                />
            </div>
        </>
    )
}

export default GroupButton