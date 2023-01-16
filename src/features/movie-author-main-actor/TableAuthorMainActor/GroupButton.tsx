import { useAppDispatch } from 'app/hooks';
import { ButtonTable } from 'components/Common'
import COLORS from 'constants/colors';
import { AuthorActorContext } from 'contexts/AuthorActorContext';
import { ModalContext } from 'contexts/ModalContext';
import React, { useContext } from 'react';
import { IoCreate, IoTrashSharp } from "react-icons/io5";
import { setDataUpdateAuthroActor } from 'reducers/authorActorReducer/authorActorSlice';

interface GroupButtonProps {
    status: number,
    data: any,
}

const arrType = [
    {
        value: 1,
        name: "Đạo diễn",
    },
    {
        value: 2,
        name: "Diễn viên",
    }
]

function GroupButton({ data }: GroupButtonProps) {
    const dispatch = useAppDispatch();
    const { setModalEditAuthorActor } = useContext(ModalContext);

    const { dispatchAT } = useContext(AuthorActorContext);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <ButtonTable 
                    icon={
                        <IoCreate />
                    }
                    color={COLORS.BLUE_INFO}
                    onClick={() => {
                        dispatch(setDataUpdateAuthroActor({
                            id: data.id,
                            name: data.name,
                            type: arrType.filter(arr => arr.name === data.type)[0]?.value || 0,
                        }))

                        setModalEditAuthorActor(true);
                    }}
                />
                <ButtonTable 
                    icon={
                        <IoTrashSharp />
                    }
                    color={COLORS.RED_ERROR}
                    onClick={() => {
                        dispatchAT({
                            type: 'SET_ASK_DELETED_MODAL',
                            payload: true,
                        })

                        dispatchAT({
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