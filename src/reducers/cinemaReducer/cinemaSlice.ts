import { createSlice } from '@reduxjs/toolkit';
import { STATUS_FAILED, STATUS_SUCCESS } from 'constants/status';
import { CinemaSlice, DataEditCinema, MsgErrorFormCinema } from 'models/cinema';

// state error form value
const msgErrorForm: MsgErrorFormCinema = {
    msgSite: '',
    msgCinemaName: '',
    msgAddress: '',
}

// state data edit cinema
const dataEditCinema: DataEditCinema = {
    id: '',
    siteCode: '',
    siteName: '',
    cinemaName: '',
    address: '',
    pointLat: '',
    pointLng: '',
}


// inital state defalt cinema
const initialState: CinemaSlice = {
    loadingFetch: false,
    loadingEdit: false,

    sites: [],
    selectSite: null,
    cinemas: [],
    areas: [],

    statusEdited: 0,

    totalPage: 0,
    totalRows: 0,
    currentPage: 1,

    dataEditCinema: dataEditCinema,

    errorMessage: '',
    msgDataEdit: msgErrorForm,
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
        setLoadingEdit: (state, { payload }) => {
            return {
                ...state,
                loadingEdit: payload,
            }
        },

        // ACTION: HANDLE FORM VALUE
        setSiteCinema: (state, { payload }) => {
            return {
                ...state,
                dataEditCinema: {
                    ...state.dataEditCinema,
                    siteCode: payload.siteCode,
                    siteName: payload.siteName,
                },
            }
        },
        setCinemaName: (state, { payload }) => {
            return {
                ...state,
                dataEditCinema: {
                    ...state.dataEditCinema,
                    cinemaName: payload,
                },
            }
        },
        setAddressCinema: (state, { payload }) => {
            return {
                ...state,
                dataEditCinema: {
                    ...state.dataEditCinema,
                    address: payload,
                },
            }
        },
        setPointLngCinema: (state, { payload }) => {
            return {
                ...state,
                dataEditCinema: {
                    ...state.dataEditCinema,
                    pointLng: payload,
                },
            }
        },
        setPointLatCinema: (state, { payload }) => {
            return {
                ...state,
                dataEditCinema: {
                    ...state.dataEditCinema,
                    pointLat: payload,
                },
            }
        },
        setMsgErrorDataEdit: (state, { payload }) => {
            return {
                ...state,
                msgDataEdit: {
                    ...state.dataEditCinema,
                    ...payload,
                },
            }
        },

        // ACTION: HANDLE CALL API
        // Fetch All Site
        fetchAllSiteSuccess: (state, { payload }) => {
            return {
                ...state,
                sites: payload,
                selectSite: payload[0]?.id,
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
        // Fetch local address
        fetchLocalAddressSuccess: (state, { payload }) => {
            return {
                ...state,
                areas: payload,
            }
        },
        fetchLocalAddressFailed: (state, { payload }) => {
            return {
                ...state,
                errorMessage: payload.message,
            }
        },
        // Request data created cinema 
        createdCinemaSuccess: (state, { payload }) => {
            return {
                ...state,
                statusEdited: STATUS_SUCCESS,
                loadingEdit: false,
                dataEditCinema: dataEditCinema, // set default value form
                msgDataEdit: msgErrorForm, // set default message error
            }
        },
        createdCinemaFailed: (state, { payload }) => {
            return {
                ...state,
                errorMessage: payload.message,
                statusEdited: STATUS_FAILED,
                loadingEdit: false,
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
        setDefaultStatus: (state) => {
            return {
                ...state,
                statusEdited: 0,
            }
        }
    },
});

export const { 
    setLoadingFetch,
    setLoadingEdit,

    setSiteCinema,
    setCinemaName,
    setAddressCinema,
    setPointLngCinema,
    setPointLatCinema,
    setMsgErrorDataEdit,

    fetchAllSiteSuccess,
    fetchAllSiteFailed,
    fetchCinemaBySiteSuccess,
    fetchCinemaBySiteFailed,
    fetchLocalAddressSuccess,
    fetchLocalAddressFailed,
    createdCinemaSuccess,
    createdCinemaFailed,
    
    setDataSelectSite,
    clearCinemas,
    setDefaultStatus,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
