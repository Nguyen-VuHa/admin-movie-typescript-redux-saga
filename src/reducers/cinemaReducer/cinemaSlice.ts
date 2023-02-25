import { createSlice } from '@reduxjs/toolkit';
import { CinemaSlice } from 'models/cinema';

// inital state defalt cinema
const initialState: CinemaSlice = {
    loadingFetch: false,
    loadingCreate: false,

    sites: [],
    selectSite: null,
    cinemas: [],

    statusEdited: 0,

    totalPage: 0,
    totalRows: 0,
    currentPage: 1,

    errorMessage: '',
};


export const cinemaSlice = createSlice({ 
    name: 'cinemas',
    initialState,
    reducers: {
        // ACTION: LOADING
        setLoadingFetch: (state, { payload }) => {
            return {
                ...state,
                loadingFetch: payload,
            }
        },

        // ACTION: HANDLE CALL API
        // Fetch All Site
        fetchAllSiteSuccess: (state, { payload }) => {
            return {
                ...state,
                sites: payload,
            }
        },
        fetchAllSiteFailed: (state, { payload }) => {
            return {
                ...state,
                errorMessage: payload.message,
            }
        },
        // Fetch Cinema By Site
        fetchCinemaBySiteSuccess: (state, { payload }) => {
            let findSite = state.sites.filter(s => s.id === payload.id)[0];
            return {
                ...state,
                cinemas: payload.data.map((d: any) => { return { ...d, code: findSite?.code, siteName: findSite?.siteName }}),
                totalPage: payload.totalPage,
                totalRows: payload.totalRows,
                loadingFetch: false,
            }
        },
        fetchCinemaBySiteFailed: (state, { payload }) => {
            return {
                ...state,
                errorMessage: payload.message,
                loadingFetch: false,
            }
        },

        // ACTION: HANDLE CLIENT
        setDataSelectSite: (state, { payload }) => {
            return {
                ...state,
                selectSite: payload,
            }
        },
        clearCinemas: (state) => {
            return {
                ...state,
                cinemas: [],
            }
        },
    },
});

export const { 
    setLoadingFetch,

    fetchAllSiteSuccess,
    fetchAllSiteFailed,
    fetchCinemaBySiteSuccess,
    fetchCinemaBySiteFailed,
    
    setDataSelectSite,
    clearCinemas,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
