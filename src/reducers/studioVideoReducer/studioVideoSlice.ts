import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    videoFileUpload: null,
    formUpload: {
        title: '',
        category: [],
        description: '',
    },
    
    modalEditImg: false,
    thumbnailsBase64: '',

    isUploadVideo: false,
    isFetchVideoList: false,

    videoParams: {
        page: 1,
        pageSize: 10,
        search: "",
    },
    
    videoTotalRows: 0,
    videos: [],
};

const getFileNameWithoutExtension = (fileName: string) => {
    const parts = fileName.split('.');
    // Nếu chỉ có 1 phần thì return luôn
    if (parts.length === 1) return fileName;
  
    // Lấy các phần trừ phần đuôi (phần cuối cùng)
    return parts.slice(0, -1).join('.');
};

export const studioVideoSlice = createSlice({ 
    name: 'studio-video',
    initialState,
    reducers: {
        resetFormUpload: (state) => {
            return {
                ...state,
                formUpload: {
                    title: '',
                    category: [],
                    description: '',
                },
                thumbnailsBase64: '',
                videoFileUpload: null,
            }
        },
        setVideoFileUpload: (state, { payload }) => {
            return {
                ...state,
                videoFileUpload: payload,
                formUpload: {
                    ...state.formUpload,
                    title: getFileNameWithoutExtension(payload.name)
                }
            }
        },
        setTitleForm: (state, { payload }) => { 
            return {
                ...state,
                formUpload: {
                    ...state.formUpload,
                    title: payload,
                }
            }
        },
        setCategoryForm: (state, { payload }) => { 
            return {
                ...state,
                formUpload: {
                    ...state.formUpload,
                    category: payload,
                }
            }
        },
        setDescriptionForm: (state, { payload }) => { 
            return {
                ...state,
                formUpload: {
                    ...state.formUpload,
                    description: payload,
                }
            }
        },
        setImageThumbnail: (state, { payload }) => {
            return {
                ...state,
                thumbnailsBase64: payload,
            }
        },
        setDefaultImageEdit: (state) => {
            return {
                ...state,
                thumbnailsBase64: '',
            }
        },
        setModalEditImage: (state, { payload }) => {
            return {
                ...state,
                modalEditImg: payload,
            }
        },
        setVideoParams: (state, { payload }) => {
            return {
                ...state,
                videoParams: {
                    ...state.videoParams,
                    ...payload,
                }
            }
        },
        setStatusIsFetchVideoList: (state, { payload }) => {
            return {
                ...state,
                isFetchVideoList: payload,
            }
        },
        fetchVideoListSuccess: (state, { payload }) => {
            return {
                ...state,
                videos: payload.data || [],
                videoTotalRows: payload.totalRows,
            }
        },
        fetchVideoListFailed: (state, { payload }) => {
            return {
                ...state,
                videos: [],
                videoTotalRows: 0,
            }
        },
    },
});

export const { 
    resetFormUpload, 
    
    setVideoFileUpload,
    setTitleForm, setCategoryForm, setDescriptionForm,

    setImageThumbnail, setDefaultImageEdit,  setModalEditImage,
 
    setVideoParams,
    setStatusIsFetchVideoList, fetchVideoListSuccess, fetchVideoListFailed,
} = studioVideoSlice.actions;

export default studioVideoSlice.reducer;
