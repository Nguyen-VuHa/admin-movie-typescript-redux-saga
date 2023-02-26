import { createSlice } from '@reduxjs/toolkit';
import { MovieSlice, MsgErrorFormMovie } from 'models';
import moment from 'moment';

const msgErrorForm: MsgErrorFormMovie = {
    msgMovieName: '',
    msgShowtime: '',
    msgStartDate: '',
    msgEndDate: '',
    msgDescription: '',
    msgIdTrailer: '',
    msgAuthor: '',
    msgMainActor: '',
    msgCategories: '',
}

const initialState: MovieSlice = {
    loadingFetch: true,
    loadingEdit: false,   
    loadingDetail: false,

    statusEdit: 0,
    statusDeleted: 0,
    statusDetail: 0,

    movies: [],

    totalPage: 0,
    totalRows: 0,
    currentPage: 1,

    errorMessage: '',

    search: '',
    sortBy: '',

    modalEditImg: false,
    imgBase64: '',
    listPoster: [],

    dataEdit: {
        id: '',
        movieName: '',
        showTime: 0,
        startDate: '',
        endDate: '',
        description: '',
        idTrailer: '',
        author: [],
        mainActor: [],
        categories: [],
    },
    msgDataEdit: msgErrorForm,
};

export const movieSlice = createSlice({ 
    name: 'movies',
    initialState,
    reducers: {
        // Handle Data Edit Movie
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
        setMainActorSelectEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    mainActor: payload,
                }
            }
        },
        setAuthorSelectEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    author: payload,
                }
            }
        },
        setCategorySelectEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    categories: payload,
                }
            }
        },
        setIDTrailerEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    idTrailer: payload,
                }
            }
        },
        setDescriptionEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    description: payload,
                }
            }
        },
        setEndDateEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    endDate: payload,
                }
            }
        },
        setStartDateEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    startDate: payload,
                }
            }
        },
        setShowtimeEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    showTime: payload,
                }
            }
        },
        setMovieNameEdit: (state, { payload }) => {
            return {
                ...state,
                dataEdit: {
                    ...state.dataEdit,
                    movieName: payload,
                }
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
        setLoadingDetail: (state) => {
            return {
                ...state,
                loadingDetail: true,
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
        fetchDetailMovieSuccess: (state, { payload }) => {
            return {
                ...state,
                loadingDetail: false,
                dataEdit: {
                    ...state.dataEdit,
                    ...payload,
                    startDate: moment(payload.startDate).format('YYYY-MM-DD'),
                    endDate: moment(payload.endDate).format('YYYY-MM-DD'),
                },
                listPoster: payload.poster.map((p: any, idx: number) => {
                    return {
                        id: idx + 1,
                        base64: p,
                    }
                }),
            }
        },
        fetchDetailMovieFailed: (state, { payload }) => {
            return {
                ...state,
                loadingDetail: false,
                errorMessage: payload.message,
                statusDetail: 2,
            }
        },
        updateStatusMovie: (state, { payload }) => {
            return {
                ...state,
                movies: state.movies.map(mv => mv.id === payload.id ? { ...mv, status: payload.status ? mv.status == 1 ? 0 : 1 : mv.status } : { ...mv })
            }
        },
        createNewMovieSuccess: (state) => {
            return {
                ...state,
                loadingEdit: false,
                statusEdit: 1,
            }
        },
        createNewMovieFailed: (state, { payload }) => {
            return {
                ...state,
                loadingEdit: false,
                errorMessage: payload,
                statusEdit: 2,
            }
        },
        updateMovieSuccess: (state) => {
            return {
                ...state,
                loadingCreate: false,
                statusEdit: 1,
            }
        },
        updateMovieFailed: (state, { payload }) => {
            return {
                ...state,
                loadingCreate: false,
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
        setModalEditImage: (state, { payload }) => {
            return {
                ...state,
                modalEditImg: payload,
            }
        },
        setImageBase64: (state, { payload }) => {
            return {
                ...state,
                imgBase64: payload,
            }
        },
        setListPoster: (state, { payload }) => {
            return {
                ...state,
                listPoster: state.listPoster.concat(payload),
            }
        },
        removeItemPoster: (state, { payload }) => {
            return {
                ...state,
                listPoster: state.listPoster.filter((lp) => lp.id !== payload),
            }
        },
        // ACTION DEFAULT VALUE
        resetFormEditMovie: (state) => {
            return {
                ...state,
                dataEdit: {
                    id: '',
                    movieName: '',
                    showTime: 0,
                    startDate: '',
                    endDate: '',
                    description: '',
                    idTrailer: '',
                    author: [],
                    mainActor: [],
                    categories: [],
                },
                listPoster: [],
                msgDataEdit: msgErrorForm,
            }
        },
        setDefaultImageEdit: (state) => {
            return {
                ...state,
                imgBase64: '',
            }
        },
        resetStatusDetail: (state) => {
            return {
                ...state,
                statusDetail: 0,
            }
        },
        setDefaultStatusEditMovie: (state) => {
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
    setMovieNameEdit,
    setShowtimeEdit,
    setIDTrailerEdit,
    setDescriptionEdit,
    setStartDateEdit,
    setEndDateEdit,
    setCategorySelectEdit,
    setMainActorSelectEdit,
    setAuthorSelectEdit,
    setErrorFormData,
    resetErrorFormData,
    
    setLoadingFetch,
    setLoadingEdit,
    setLoadingDetail,

    fetchMovieSuccess,
    fetchMovieFailed,
    updateStatusMovie,
    createNewMovieSuccess,
    createNewMovieFailed,
    fetchDetailMovieSuccess,
    fetchDetailMovieFailed,
    updateMovieSuccess,
    updateMovieFailed,
    
    setCurrentPage,
    setSearchText,
    setSortBy,
    setModalEditImage,
    setImageBase64,
    setListPoster,
    removeItemPoster,

    setDefaultImageEdit,
    setDefaultStatusEditMovie,
    resetStatusDetail,
    resetFormEditMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
