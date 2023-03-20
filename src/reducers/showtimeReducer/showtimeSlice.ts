import { createSlice } from '@reduxjs/toolkit';
import { DataEditShowTime, MsgErrorFormShowTime, ShowtimeSlice } from 'models';
import moment from 'moment';

// initalzation object message error
const msgErrorForm: MsgErrorFormShowTime = {
    msgRoomId: '',
    msgMovieId: '',
    msgFare: '',
    msgShowtime: '',
}

// initalzation data edit
const initialDataEdit: DataEditShowTime = {
    id: '',
    roomId: '',
    movieId: '',
    fare: 0,
    showtime: '',
    description: '',
}

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

    dataEdit: initialDataEdit,
    msgDataEdit: msgErrorForm,

    errorMessage: '',

    siteSelectEdit: null,
    cinemaSelectEdit: null,
};

export const showtimeSlice = createSlice({ 
    name: 'showtimes',
    initialState,
    reducers: {
        // Handle Data Edit Showtime
        resetErrorFormData: (state) => {
            return {
                ...state,
                msgDataEdit: msgErrorForm,
            }
        },
        setErrorFormData: (state, { payload }) => {
            return {
                ...state,
                msgDataEdit: payload,
            }
        },
        setRoomEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    roomId: payload,
                },
            }
        },
        setMovieEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    movieId: payload,
                },
            }
        },
        setFareShowTimeEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    fare: payload,
                },
            }
        },
        setShowTimeEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    showtime: payload,
                },
            }
        },
        setDescriptionEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    description: payload,
                },
            }
        },
        // ACTION LOADING
        setLoadingFetch: (state) => {
            return {
                ...state,
                loadingFetch: true,
            }
        },
        setLoadingEdit: (state) => {
            return {
                ...state,
                loadingEdit: true,
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
        createShowtimeSuccess: (state) => {
            return {
                ...state,
                loadingEdit: false,
                statusEdit: 1,
            }
        },
        createShowtimeFailed: (state, { payload }) => {
            return {
                ...state,
                loadingEdit: false,
                errorMessage: payload,
                statusEdit: 2,
            }
        },
        // ACTION HANDLE UI
        setCurrentPage: (state, { payload }) => {
            return {
                ...state,
                currentPage: payload,
            }
        },
        setSiteSelectedEdit: (state, { payload }) => {
            return {
                ...state,
                siteSelectEdit: payload,
                cinemaSelectEdit: null,
                dataEdit: {
                    ...state.dataEdit,
                    roomId: '',
                },
            }
        },
        setCinemaSelectedEdit: (state, { payload }) => {
            return {
                ...state,
                cinemaSelectEdit: payload,
                dataEdit: {
                    ...state.dataEdit,
                    roomId: '',
                },
            }
        },
        // ACTION DEFAULT VALUE
        resetFormEditShowtime: (state) => {
            return {
                ...state,
                dataEdit: initialDataEdit,
                msgDataEdit: msgErrorForm,
            }
        },
        setDefaultStatusEditShowTime: (state) => {
            return {
                ...state,
                statusEdit: 0,
                statusDeleted: 0,
                statusDetail: 0,
                errorMessage: '',
            }
        }
    },
});

export const { 
    resetErrorFormData,
    setErrorFormData,
    // handle data form edit
    setRoomEdit,
    setMovieEdit,
    setFareShowTimeEdit,
    setShowTimeEdit,
    setDescriptionEdit,

    // SET LOADING FETCH
    setLoadingFetch,
    setLoadingEdit,

    // FETCH LIST SHOWTIMES
    fetchShowtimeSuccess,
    fetchShowtimeFailed,
    createShowtimeSuccess,
    createShowtimeFailed,

    // SET CURRENT PAGE IN TABLE SHOWTIMES
    setCurrentPage,
    setSiteSelectedEdit,
    setCinemaSelectedEdit,

    resetFormEditShowtime,
    setDefaultStatusEditShowTime,
} = showtimeSlice.actions;

export default showtimeSlice.reducer;
