import { createSlice } from '@reduxjs/toolkit';
import { AuthorActorSlice } from 'models/authorActor';

const initialState: AuthorActorSlice = {
    loadingFetch: true,
    loadingCreate: false,
    statusCreated: 0,
    statusUpdated: 0,
    statusDeleted: 0,

    authorActors: [],
    authorACtorSelect: [],

    totalPage: 0,
    totalRows: 0,
    currentPage: 1,
    errorMessage: '',

    id: null,
    search: '',
    type: 0,
    authorActorName: '',
};

export const authorActorSlice = createSlice({ 
    name: 'authorActors',
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
        fetchAuthorActorSelectSuccess: (state, { payload }) => {
            return {
                ...state,
                authorACtorSelect: payload,
            }
        },
        fetchAuthorActorSelectFailed: (state, { payload }) => {
            return {
                ...state,
                errorMessage: payload.message,
                authorACtorSelect: [],
            }
        },
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
        createNewAuthorActorSuccess: (state) => {
            return {
                ...state,
                loadingCreate: false,
                statusCreated: 1,
            }
        },
        createdNewAuthorActorFailed: (state, { payload }) => {
            return {
                ...state,
                loadingCreate: false,
                statusCreated: 2,
                errorMessage: payload.message,
            }
        },
        deleteAuthorActorSuccess: (state, { payload }) => {
            return {
                ...state,
                authorActors: state.authorActors.filter(at => at.id !== payload),
                statusDeleted: 1,
            }
        },
        deleteAuthorActorFailed: (state, { payload }) => {
            return {
                ...state,
                statusDeleted: 2,
                errorMessage: payload.message,
            }
        },
        updateItemAuthorActor: (state, { payload }) => {
            return {
                ...state,
                authorActors: state.authorActors.map(at => at.id === payload.id ? { ...at, name: payload.name, type: payload.type } : { ...at }),
                id: null,
                authorActorName: '',
            }
        },
        updatedAuthorActorSuccess: (state) => {
            return {
                ...state,
                loadingCreate: false,
                statusUpdated: 1,
            }
        },
        updatedAuthorActorFailed: (state, { payload }) => {
            return {
                ...state,
                loadingCreate: false,
                statusUpdated: 2,
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
        setTypeAuthorActor: (state, { payload }) => {
            return {
                ...state,
                type: payload,
            }
        },
        setCurrentPageAuthorActor: (state, { payload }) => {
            return {
                ...state,
                currentPage: payload,
            }
        },
        setAuthorActorName: (state, { payload }) => {
            return {
                ...state,
                authorActorName: payload,
            }
        },
        setDefaultValueSubmit: (state) => {
            return {
                ...state,
                authorActorName: '',
                type: 0,
            }
        },
        addNewAuthorActor: (state, { payload }) => {
            return {
                ...state,
                authorActors: [payload].concat(state.authorActors),
            }
        },
        setDataUpdateAuthroActor: (state, { payload }) => {
            return {
                ...state,
                id: payload.id,
                authorActorName: payload.name,
                type: payload.type,
            }
        },
        setDefaultDataUpdateAuthorActor: (state) => {
            return {
                ...state,
                id: null,
                authorActorName: '',
                type: 0,
            }
        },

        // ACTION DEFAULT VALUE
        setDefaultStatusAuthorActor: (state) => {
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
    setTypeAuthorActor,
    setAuthorActorName,
    setDefaultValueSubmit,
    setDefaultStatusAuthorActor,
    addNewAuthorActor,
    setCurrentPageAuthorActor,
    setDefaultDataUpdateAuthorActor,

    fetchAuthorActorSelectSuccess,
    fetchAuthorActorSelectFailed,
    fetchAuthorActorSuccess,
    fetchAuthorActorFailed,
    createNewAuthorActorSuccess,
    createdNewAuthorActorFailed,
    deleteAuthorActorSuccess,
    deleteAuthorActorFailed,
    updateItemAuthorActor,
    updatedAuthorActorSuccess,
    updatedAuthorActorFailed,
    setDataUpdateAuthroActor,
} = authorActorSlice.actions;

export default authorActorSlice.reducer;
