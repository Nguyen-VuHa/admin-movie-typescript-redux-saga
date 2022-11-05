import { createSlice } from '@reduxjs/toolkit';
import { AuthorActorSlice } from 'models/authorActor';

const initialState: AuthorActorSlice = {
    loadingFetch: true,
    loadingCreate: false,
    statusCreated: 0,
    statusUpdated: 0,
    statusDeleted: 0,

    authorActors: [],

    totalPage: 0,
    totalRows: 0,
    currentPage: 1,
    errorMessage: '',

    id: null,
    search: '',
    type: 0,
};

export const authorActorSlice = createSlice({ 
    name: 'categories',
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
        fetchAuthorActorSuccess: (state, { payload }) => {
            return {
                ...state,
                loadingFetch: false,
                authorActors: payload.data,
                totalPage: payload.totalPage,
                totalRows: payload.totalRows,
            }
        },
        fetchAuthorActorFailed: (state, { payload }) => {
            return {
                ...state,
                loadingFetch: false,
                errorMessage: payload.message,
            }
        },
        // ACTION HANDLE UI
        setAuthorActorSearch: (state, { payload }) => {
            return {
                ...state,
                search: payload,
            }
        },
        // ACTION DEFAULT VALUE
        setDefaultStatus: (state) => {
            return {
                ...state,
                statusCreated: 0,
                statusUpdated: 0,
                statusDeleted: 0,
                errorMessage: '',
            }
        },
    },
});

export const { 
    setLoadingFetch, 
    setLoadingCreated,
    setAuthorActorSearch,

    fetchAuthorActorSuccess,
    fetchAuthorActorFailed,
} = authorActorSlice.actions;

export default authorActorSlice.reducer;
