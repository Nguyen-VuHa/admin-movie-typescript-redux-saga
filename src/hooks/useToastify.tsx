import { useAppDispatch } from 'app/hooks';
import { useCallback } from 'react'
import { addToastTopLeft } from 'reducers/toastifyReducer/toastifySlice';
import { v4 as uuidV4 } from 'uuid';

interface ActionToast {
    type: string,
    payload: ActionPayload,
}

interface ActionPayload {
    position: 'top-left' | 'bottom-left' | 'middle-top' | 'middle-bottom' | 'top-right' | 'bottom-right',
    message: string,
}

const TOP_LEFT = 'top-left';
const BOTTOM_LEFT = 'bottom-left';
// const MIDDLE_TOP = 'middle-top';
// const MIDDLE_BOTTOM = 'middle-bottom';
// const TOP_RIGHT = 'top-right';
// const BOTTOM_RIGHT = 'bottom-right';

const TYPE_NORMAL = 'normal';
const TYPE_SUCCESS = 'success';
const TYPE_INFO = 'info';
const TYPE_WARN = 'warn';
const TYPE_ERROR = 'error';

function useToastify() {
    const dispatch = useAppDispatch();

    const handleToastLeft = useCallback((message: string, type: string, position: string) => {
        dispatch(addToastTopLeft({
            uuid: uuidV4(),
            position: position,
            duration: 3500,
            toastText: message,
            type: type,
        }));

    }, [dispatch]);
    

    const dispatchToast = (action: ActionToast): void => {
        const { payload } = action;

        switch (action.type) {
            case 'TYPE_NORMAL':
                if(payload.position === TOP_LEFT)
                    handleToastLeft(payload.message, TYPE_NORMAL, payload.position)
                if(payload.position === BOTTOM_LEFT)
                    handleToastLeft(payload.message, TYPE_NORMAL, payload.position)
                break;
            case 'TYPE_SUCCESS':
                if(payload.position === TOP_LEFT)
                    handleToastLeft(payload.message, TYPE_SUCCESS, payload.position)
                if(payload.position === BOTTOM_LEFT)
                    handleToastLeft(payload.message, TYPE_SUCCESS, payload.position)
                break;
            case 'TYPE_INFO':
                if(payload.position === TOP_LEFT)
                    handleToastLeft(payload.message, TYPE_INFO, payload.position)
                if(payload.position === BOTTOM_LEFT)
                    handleToastLeft(payload.message, TYPE_INFO, payload.position)
                break;
            case 'TYPE_WARN':
                if(payload.position === TOP_LEFT)
                    handleToastLeft(payload.message, TYPE_WARN, payload.position)
                if(payload.position === BOTTOM_LEFT)
                    handleToastLeft(payload.message, TYPE_WARN, payload.position)
                break;
            case 'TYPE_ERROR':
                if(payload.position === TOP_LEFT)
                    handleToastLeft(payload.message, TYPE_ERROR, payload.position)
                if(payload.position === BOTTOM_LEFT)
                    handleToastLeft(payload.message, TYPE_ERROR, payload.position)
                break;
            default:
                break;
        }
    }


    return dispatchToast;
}

export default useToastify