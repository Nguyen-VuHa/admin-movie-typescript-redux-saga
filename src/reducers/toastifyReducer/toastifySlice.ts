import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastContent, Toastify } from 'models/toastify';

const initialState: Toastify = {
    topRight: [],
    bottomRight: [],
    topCenter: [],
    bottomCenter: [],
    topLeft: [],
    bottomLeft: [],
};

export const toastifySlice = createSlice({ 
    name: 'toastify',
    initialState,
    reducers: {
        addToastTopRight: (state, action: PayloadAction<ToastContent>) => {
            return {
                ...state,
                topRight: state.topRight.concat(action.payload),
            }
        },
        addToastBottomRight: (state, action: PayloadAction<ToastContent>) => {
            return {
                ...state,
                bottomRight: state.bottomRight.concat(action.payload),
            }
        },
        addToastTopCenter: (state, action: PayloadAction<ToastContent>) => {
            return {
                ...state,
                topCenter: state.topCenter.concat(action.payload),
            }
        },
        addToastBottomCenter: (state, action: PayloadAction<ToastContent>) => {
            return {
                ...state,
                bottomCenter: state.bottomCenter.concat(action.payload),
            }
        },

        addToastTopLeft: (state, action: PayloadAction<ToastContent>) => {
            state.topLeft = state.topLeft.concat(action.payload);
            if(state.topLeft.filter(tl => tl.duration > 0).length > 4) {
                let indexDurantionZero = state.topLeft.filter(tl => tl.duration === 0).length;
                state.topLeft = state.topLeft.map((tl, idx) => idx - indexDurantionZero === 0 ? {...tl, duration: 0} : {...tl})
            }
        },
        removeItemTopLeft: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                topLeft: state.topLeft.filter(tl => tl.uuid !== action.payload),
            }
        },

        addToastBottomLeft: (state, action: PayloadAction<ToastContent>) => {
            return {
                ...state,
                bottomLeft: state.bottomLeft.concat(action.payload),
            }
        },
    },
    extraReducers: () => {},
});

export const { 
    addToastTopRight, 
    addToastBottomRight, 
    addToastTopCenter, 
    addToastBottomCenter,
    addToastTopLeft,
    removeItemTopLeft,
    addToastBottomLeft,
} = toastifySlice.actions;

export default toastifySlice.reducer;
