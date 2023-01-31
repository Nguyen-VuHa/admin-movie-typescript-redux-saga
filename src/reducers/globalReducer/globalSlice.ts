import { createSlice } from '@reduxjs/toolkit';
import { GlobalSlice } from 'models';

const initialState: GlobalSlice = {
    loadingFullScreen: false,
};

export const globalSlice = createSlice({ 
    name: 'global-variable',
    initialState,
    reducers: {
        // ACTION LOADING
        setLoadingFullScreen: (state, { payload }) => {
            return {
                ...state,
                loadingFullScreen: payload,
            }
        }
    },
});

export const { 
    setLoadingFullScreen
} = globalSlice.actions;

export default globalSlice.reducer;
