import { createSlice } from '@reduxjs/toolkit';
import { MovieSlice } from 'models';

const msgErrorForm = {
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

    modalEditImg: false,
    imgBase64: '',
    listPoster: [],

    dataEdit: {
        id: '',
        movieName: '',
        showtime: 0,
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
                    showtime: payload,
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
        createNewMovieSuccess: (state) => {
            return {
                ...state,
                loadingCreate: false,
                statusCreated: 1,
            }
        },
        createNewMovieFailed: (state, { payload }) => {
            return {
                ...state,
                loadingCreate: false,
                errorMessage: payload,
                statusCreated: 2,
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
                    showtime: 0,
                    startDate: '',
                    endDate: '',
                    description: '',
                    idTrailer: '',
                    author: [],
                    mainActor: [],
                    categories: [],
                },
                msgDataEdit: msgErrorForm,
            }
        },
        setDefaultImageEdit: (state) => {
            return {
                ...state,
                imgBase64: '',
            }
        },
        setDefaultStatusEditMovie: (state) => {
            return {
                ...state,
                statusCreated: 0,
                statusUpdated: 0,
                statusDeleted: 0,
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
    setLoadingCreated,

    fetchMovieSuccess,
    fetchMovieFailed,
    updateStatusMovie,
    createNewMovieSuccess,
    createNewMovieFailed,

    setCurrentPage,
    setSearchText,
    setSortBy,
    setModalEditImage,
    setImageBase64,
    setListPoster,
    removeItemPoster,

    setDefaultImageEdit,
    setDefaultStatusEditMovie,
    resetFormEditMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
