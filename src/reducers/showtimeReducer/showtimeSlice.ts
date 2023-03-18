import { createSlice } from '@reduxjs/toolkit';
import { ShowtimeSlice } from 'models';
import moment from 'moment';

// initial data on redux slice
const initialState: ShowtimeSlice = {
    loadingFetch: true,
    loadingEdit: false,   
    loadingDetail: false,

    statusEdit: 0,
    statusDeleted: 0,
    statusDetail: 0,

    showtimes: [],

    totalPage: 0,
    totalRows: 0,
    currentPage: 1,

    errorMessage: '',
};

export const showtimeSlice = createSlice({ 
    name: 'showtimes',
    initialState,
    reducers: {
        // Handle Data Edit Showtime
        
        // ACTION LOADING
        setLoadingFetch: (state) => {
            return {
                ...state,
                loadingFetch: true,
            }
        },
        
        // ACTION HANDLE CALL API
        fetchShowtimeSuccess: (state, { payload }) => {
            return {
                ...state,
                loadingFetch: false,
                showtimes: payload.data,
                totalPage: payload.totalPage,
                totalRows: payload.totalRows,
            }
        },
        fetchShowtimeFailed: (state, { payload }) => {
            return {
                ...state,
                loadingFetch: false,
                errorMessage: payload.message,
            }
        },
        // ACTION HANDLE UI
        setCurrentPage: (state, { payload }) => {
            return {
                ...state,
                currentPage: payload,
            }
        },
        // ACTION DEFAULT VALUE
    },
});

export const { 
    // SET LOADING FETCH
    setLoadingFetch,

    // FETCH LIST SHOWTIMES
    fetchShowtimeSuccess,
    fetchShowtimeFailed,

    // SET CURRENT PAGE IN TABLE SHOWTIMES
    setCurrentPage,
} = showtimeSlice.actions;

export default showtimeSlice.reducer;
