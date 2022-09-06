import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dashboardApi from 'api/dashboardApi';
import { RootState, AppThunk } from 'app/store';
import { DashBoard } from 'models/dashboard';

const initialState: DashBoard = {
    countMemberShip: 0,
    turnOver: null,
    countMovieMew: 0,
    countCommentAndRate: 0,
    loadingOverView: false,
    errorMessage: '',
};

export const fetchDataOverViewDashBoard = createAsyncThunk('GET_DATA_OVERVIEW_DASHBOARD', async () => {
    const stateReponse = await dashboardApi.fetchDataOverViewApi();
    return stateReponse;
});

export const dashboardSlice = createSlice({ 
    name: 'dashboard',
    initialState,
    reducers: {
        setLoadingOverView: (state) => {
            return {
                ...state,
                loadingOverView: true,
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataOverViewDashBoard.fulfilled, (state, { payload }) => {
            return {
                ...state,
                ...payload,
                loadingOverView: false,
            }
        })
        builder.addCase(fetchDataOverViewDashBoard.rejected, (state, action) => {
            if (action.payload) {
                state.errorMessage = 'FETCH DATA ERROR'
            } else {
                state.errorMessage = action.error.toString()
            }
        })
    },
});

export const { setLoadingOverView } = dashboardSlice.actions;

export default dashboardSlice.reducer;
