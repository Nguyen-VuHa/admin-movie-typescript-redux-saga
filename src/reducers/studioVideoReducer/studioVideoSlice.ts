import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    videoFileUpload: null,
    formUpload: {
        title: '',
        category: [],
        description: '',
    }
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
        }
    },
});

export const { 
    setVideoFileUpload,
    setTitleForm, setCategoryForm, setDescriptionForm,
} = studioVideoSlice.actions;

export default studioVideoSlice.reducer;
