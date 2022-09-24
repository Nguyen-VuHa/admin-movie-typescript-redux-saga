import { useAppDispatch } from 'app/hooks';
import { ButtonTable } from 'components/Common'
import COLORS from 'constants/colors';
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

    return (
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
    )
}

export default GroupButton