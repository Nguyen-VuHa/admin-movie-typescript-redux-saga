import { createSlice } from '@reduxjs/toolkit';
import { STATUS_FAILED, STATUS_SUCCESS } from 'constants/status';
import { CinemaSlice, DataEditCinema, DataEditRooms, MsgErrorFormCinema, MsgErrorFormRoom } from 'models/cinema';

// state error form value cinema
const msgErrorForm: MsgErrorFormCinema = {
    msgSite: '',
    msgCinemaName: '',
    msgAddress: '',
}

// state error form value room
const msgErrorFormRoom: MsgErrorFormRoom = {
    msgCinemaId: '',
    msgRoomName: '',
    msgRoomType: '',
    msgHorizontalSize: '',
    msgVerticalSize: '',
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

// state data edit rooms
const dataEditRooms: DataEditRooms = {
    id: '',
    cinemaId: '',
    roomName: '',
    type: '',
    horizontalSize: 0,
    verticalSize: 0,
}

// inital state defalt cinema
const initialState: CinemaSlice = {
    loadingFetch: false,
    loadingEdit: false,
    loadingFetchDetail: false,

    sites: [],
    selectSite: null,
    cinemas: [],
    selectCinema: null,
    cinemaCombobox: [],
    areas: [],

    rooms: [],

    statusEdited: 0,

    totalPage: 0,
    totalRows: 0,
    currentPage: 1,

    totalPageRooms: 0,
    totalRowsRooms: 0,
    currentPageRooms: 1,

    dataEditCinema: dataEditCinema,
    dataEditRooms: dataEditRooms,

    errorMessage: '',
    msgDataEdit: msgErrorForm,
    msgDataEditRoom: msgErrorFormRoom,
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
        setLoadingFetchDetail: (state, { payload }) => {
            return {
                ...state,
                loadingFetchDetail: payload,
            }
        },

        // ACTION: HANDLE FORM VALUE CINEMA
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
        setMsgErrorDataEditRoom: (state, { payload }) => {
            return {
                ...state,
                msgDataEditRoom: {
                    ...state.msgDataEditRoom,
                    ...payload,
                },
            }
        },

        // ACTION: HANDLE FORM VALUE ROOMS
        setFormCinemaId: (state, { payload }) => {
            return {
                ...state,
                dataEditRooms: {
                    ...state.dataEditRooms,
                    cinemaId: payload,
                },
            }
        },
        setFormRoomName: (state, { payload }) => {
            return {
                ...state,
                dataEditRooms: {
                    ...state.dataEditRooms,
                    roomName: payload,
                },
            }
        },
        setFormRoomType: (state, { payload }) => {
            return {
                ...state,
                dataEditRooms: {
                    ...state.dataEditRooms,
                    type: payload,
                },
            }
        },
        setFormHorizontalSize: (state, { payload }) => {
            return {
                ...state,
                dataEditRooms: {
                    ...state.dataEditRooms,
                    horizontalSize: parseInt(payload),
                },
            }
        },
        setFormVerticalSize: (state, { payload }) => {
            return {
                ...state,
                dataEditRooms: {
                    ...state.dataEditRooms,
                    verticalSize: parseInt(payload),
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
        // Fetch Cinema Select By Site
        fetchCinemaSelectBySiteSuccess: (state, { payload }) => {
            return {
                ...state,
                cinemaCombobox: payload,
            }
        },
        fetchCinemaSelectBySiteFailed: (state, { payload }) => {
            return {
                ...state,
                errorMessage: payload.message,
            }
        },
        // Fetch Cinema By Cinema Id
        fetchCinemaByIdSuccess: (state, { payload }) => {
            return {
                ...state,
                dataEditCinema: {
                    ...state.dataEditCinema,
                    ...payload,
                },
                loadingFetchDetail: false,
            }
        },
        fetchCinemaByIdFailed: (state, { payload }) => {
            return {
                ...state,
                errorMessage: payload.message,
                loadingFetchDetail: false,
            }
        },
        // Fetch room by room Id
        fetchDetailRoomByIdSuccess: (state, { payload }) => {
            return {
                ...state,
                dataEditRooms: {
                    ...state.dataEditRooms,
                    ...payload,
                },
                loadingFetchDetail: false,
            }
        },
        fetchDetailRoomByIdFailed: (state, { payload }) => {
            return {
                ...state,
                errorMessage: payload.message,
                loadingFetchDetail: false,
            }
        },
        // fetch room by cinema id
        fetchRoomByCinemaIdSuccess: (state, { payload }) => {
            let findCinemaById = state.cinemaCombobox.filter(c => c.id === payload.id)[0];
            let findSite = state.sites.filter(s => s.id === payload.siteId)[0];
            return {
                ...state,
                rooms: payload.data.map((d: any) => { return { ...d, cinemaName: findCinemaById?.cinemaName, siteId: findSite?.code }}),
                totalPageRooms: payload.totalPage,
                totalRowsRooms: payload.totalRows,
                loadingFetch: false,
            }
        },
        fetchRoomByCinemaIdFailed: (state, { payload }) => {
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
        // Request data created and update cinema 
        editCinemaSuccess: (state) => {
            return {
                ...state,
                statusEdited: STATUS_SUCCESS,
                loadingEdit: false,
                dataEditCinema: dataEditCinema, // set default value form
                msgDataEdit: msgErrorForm, // set default message error
            }
        },
        editCinemaFailed: (state, { payload }) => {
            return {
                ...state,
                errorMessage: payload.message,
                statusEdited: STATUS_FAILED,
                loadingEdit: false,
            }
        },

        // Request data created and update room 
        editRoomSuccess: (state) => {
            return {
                ...state,
                statusEdited: STATUS_SUCCESS,
                loadingEdit: false,
                dataEditRooms: dataEditRooms, // set default value form
                msgDataEdit: msgErrorForm, // set default message error
            }
        },
        editRoomFailed: (state, { payload }) => {
            return {
                ...state,
                errorMessage: payload.message,
                statusEdited: STATUS_FAILED,
                loadingEdit: false,
            }
        },

        // ACTION: HANDLE CLIENT
        setCurrentPageRooms: (state, { payload }) => {
            return {
                ...state,
                currentPageRooms: payload,
            }
        },
        setDataSelectSite: (state, { payload }) => {
            return {
                ...state,
                selectSite: payload,
            }
        },
        setDataSelectCinema: (state, { payload }) => {
            return {
                ...state,
                selectCinema: payload,
            }
        },
        clearCinemaCombobox: (state) => {
            return {
                ...state,
                cinemaCombobox: [],
            }
        },
        clearCinemas: (state) => {
            return {
                ...state,
                cinemas: [],
            }
        },
        clearRooms: (state) => {
            return {
                ...state,
                rooms: [],
            }
        },
        clearDataEditCinema: (state) => {
            return {
                ...state,
                dataEditCinema: dataEditCinema,
            }
        },
        clearDataEditRoom: (state) => {
            return {
                ...state,
                dataEditRooms: dataEditRooms,
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
    setLoadingFetchDetail,

    // Form Edit Cinema
    setSiteCinema,
    setCinemaName,
    setAddressCinema,
    setPointLngCinema,
    setPointLatCinema,
    setMsgErrorDataEdit,
    setMsgErrorDataEditRoom,
    // Form Edit Rooms
    setFormCinemaId,
    setFormRoomName,
    setFormRoomType,
    setFormHorizontalSize,
    setFormVerticalSize,

    fetchAllSiteSuccess,
    fetchAllSiteFailed,
    fetchCinemaBySiteSuccess,
    fetchCinemaBySiteFailed,
    fetchCinemaSelectBySiteSuccess,
    fetchCinemaSelectBySiteFailed,
    fetchRoomByCinemaIdSuccess,
    fetchRoomByCinemaIdFailed,
    fetchCinemaByIdSuccess,
    fetchCinemaByIdFailed,
    fetchDetailRoomByIdSuccess,
    fetchDetailRoomByIdFailed,
    fetchLocalAddressSuccess,
    fetchLocalAddressFailed,
    editCinemaSuccess,
    editCinemaFailed,
    editRoomSuccess,
    editRoomFailed,
    
    setDataSelectSite,
    setCurrentPageRooms,
    setDataSelectCinema,
    clearCinemaCombobox,
    clearCinemas,
    clearRooms,
    clearDataEditCinema,
    clearDataEditRoom,
    setDefaultStatus,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
