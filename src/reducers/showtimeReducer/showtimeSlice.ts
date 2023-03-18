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
        // Handle Data Edit Movie
        
        // ACTION LOADING
       
        
        // ACTION HANDLE CALL API
        
        // ACTION HANDLE UI
        
        // ACTION DEFAULT VALUE
    },
});

export const { 
    
} = showtimeSlice.actions;

export default showtimeSlice.reducer;
