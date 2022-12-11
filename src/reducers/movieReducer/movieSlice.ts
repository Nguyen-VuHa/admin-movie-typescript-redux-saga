import { createSlice } from '@reduxjs/toolkit';
import { MovieSlice } from 'models';

const initialState: MovieSlice = {
    loadingFetch: true,
    loadingCreate: false,

    statusCreated: 0,
    statusUpdated: 0,
    statusDeleted: 0,

    movies: [],

    totalPage: 0,
    totalRows: 0,
    currentPage: 1,

    errorMessage: '',

    search: '',
    sortBy: '',
};

export const movieSlice = createSlice({ 
    name: 'movies',
    initialState,
    reducers: {
        // ACTION LOADING
        setLoadingFetch: (state) => {
            return {
                ...state,
                loadingFetch: true,
            }
        },
        setLoadingCreated: (state) => {
            return {
                ...state,
                loadingCreate: true,
            }
        },
        
        // ACTION HANDLE CALL API
        fetchMovieSuccess: (state, { payload }) => {
            return {
                ...state,
                loadingFetch: false,
                movies: payload.data,
                totalPage: payload.totalPage,
                totalRows: payload.totalRows,
            }
        },
        fetchMovieFailed: (state, { payload }) => {
            return {
                ...state,
                loadingFetch: false,
                errorMessage: payload.message,
            }
        },
        updateStatusMovie: (state, { payload }) => {
            return {
                ...state,
                movies: state.movies.map(mv => mv.id === payload.id ? { ...mv, status: payload.status ? mv.status == 1 ? 0 : 1 : mv.status } : { ...mv })
            }
        },
        // ACTION HANDLE UI
        setCurrentPage: (state, { payload }) => {
            return {
                ...state,
                currentPage: payload,
            }
        },
        setSearchText: (state, { payload }) => {
            return {
                ...state,
                search: payload,
            }
        },
        setSortBy: (state, { payload }) => {
            return {
                ...state,
                sortBy: payload,
            }
        },
        // ACTION DEFAULT VALUE
    },
});

export const { 
    setLoadingFetch,
    setLoadingCreated,

    fetchMovieSuccess,
    fetchMovieFailed,
    updateStatusMovie,

    setCurrentPage,
    setSearchText,
    setSortBy,
} = movieSlice.actions;

export default movieSlice.reducer;
