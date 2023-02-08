import { useAppDispatch } from 'app/hooks';
import { ButtonTable } from 'components/Common'
import COLORS from 'constants/colors';
import { MovieContext } from 'contexts/MovieContext';
import React, { useContext } from 'react';
import { IoLockOpen, IoLockClosed, IoCreate } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

interface GroupButtonProps {
    status: number,
    data: any,
}

function GroupButton({ status, data }: GroupButtonProps) {
    const navigate = useNavigate();
    const { dispatchMovie } = useContext(MovieContext);

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
                        status == 1 ? <IoLockClosed /> :  <IoLockOpen />
                    }
                    color={status == 1 ? COLORS.ORANGE_WARN : COLORS.GREEN_SUCCESS}
                    onClick={() => {
                        dispatchMovie({
                            type: "SET_STATUS_MODAL_QUESTION",
                            payload: true,
                        });

                        dispatchMovie({
                            type: "SET_MOVIE_ID_UPDATE",
                            payload: data.id,
                        });
                    }}
                />
                <ButtonTable 
                    icon={
                        <IoCreate />
                    }
                    color={COLORS.BLUE_INFO}
                    onClick={() => {
                        navigate(`edit?id=${data.id}`);
                    }}
                />
            </div>
        </>
    )
}

export default GroupButton