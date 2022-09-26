import { createSlice } from '@reduxjs/toolkit';
import { CategorySlice } from 'models/categories';

const initialState: CategorySlice = {
    loadingFetch: true,
    loadingCreate: false,
    statusCreated: 0,
    statusUpdated: 0,
    categories: [],
    totalPage: 0,
    totalRows: 0,
    currentPage: 1,
    errorMessage: '',
    id: null,
    categoryNameUpdate: '',
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
                totalRows: payload.totalRows,
            }
        },
        fetchCategoryFailed: (state, { payload }) => {
            return {
                ...state,
                loadingFetch: false,
                errorMessage: payload.message,
            }
        },

        createdCategorySuccess: (state) => {
            return {
                ...state,
                loadingCreate: false,
                statusUpdated: 1,
            }
        },
        createdCategoryFailed: (state, { payload }) => {
            return {
                ...state,
                loadingCreate: false,
                statusUpdated: 2,
                errorMessage: payload.message,
            }
        },

        updatedCategorySuccess: (state) => {
            return {
                ...state,
                loadingCreate: false,
                statusUpdated: 1,
            }
        },
        updatedCategoryFailed: (state, { payload }) => {
            return {
                ...state,
                loadingCreate: false,
                statusUpdated: 2,
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
        addItemCategory: (state, { payload }) => {
            return {
                ...state,
                categories: [payload].concat(state.categories),
            }
        },
        updateItemCategory: (state, { payload }) => {
            return {
                ...state,
                categories: state.categories.map(ct => ct.id === payload.id ? { ...ct, category_name: payload.category_name } : { ...ct }),
                id: null,
                categoryNameUpdate: '',
            }
        },
        setDataUpdateCategory: (state, { payload }) => {
            return {
                ...state,
                id: payload.id,
                categoryNameUpdate: payload.name,
            }
        },
        updateStatusCategory: (state, { payload }) => {
            return {
                ...state,
                categories: state.categories.map(ct => ct.id === payload.id ? { ...ct, status: payload.status } : { ...ct }),
            }
        },
        setDefaultDataUpdate: (state) => {
            return {
                ...state,
                id: null,
                categoryNameUpdate: '',
            }
        },

        // ACTION DEFAULT VALUE
        setDefaultStatus: (state) => {
            return {
                ...state,
                statusCreated: 0,
                statusUpdated: 0,
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
    setDefaultStatus,
    addItemCategory,
    setDataUpdateCategory,
    setDefaultDataUpdate,
    updatedCategorySuccess,
    updatedCategoryFailed,
    updateItemCategory,
    updateStatusCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
