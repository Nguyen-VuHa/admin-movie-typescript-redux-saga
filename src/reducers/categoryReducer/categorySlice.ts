import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategorySlice } from 'models/categories';

const initialState: CategorySlice = {
    loadingFetch: true,
    loadingCreate: false,
    statusCreated: 0,
    categories: [],
    totalPage: 0,
    currentPage: 1,
    errorMessage: '',
};

export const categorySlice = createSlice({ 
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
        fetchCategorySuccess: (state, { payload }) => {
            return {
                ...state,
                loadingFetch: false,
                categories: payload.data,
                totalPage: payload.totalPage,
            }
        },
        fetchCategoryFailed: (state, { payload }) => {
            return {
                ...state,
                loadingFetch: false,
            }
        },

        createdCategorySuccess: (state) => {
            return {
                ...state,
                loadingCreate: false,
                statusCreated: 1,
            }
        },
        createdCategoryFailed: (state, { payload }) => {
            return {
                ...state,
                loadingCreate: false,
                statusCreated: 2,
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
        setDefaultStatus: (state) => {
            return {
                ...state,
                statusCreated: 0,
                errorMessage: '',
            }
        },
    },
});

export const { 
    setLoadingFetch, 
    fetchCategorySuccess, 
    fetchCategoryFailed,
    setCurrentPage,
    setLoadingCreated,
    createdCategorySuccess,
    createdCategoryFailed,
    setDefaultStatus
} = categorySlice.actions;

export default categorySlice.reducer;
