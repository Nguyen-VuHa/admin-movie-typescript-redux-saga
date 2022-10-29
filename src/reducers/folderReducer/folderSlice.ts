import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from 'app/store';
import { FolderSystem } from 'models';

const initialState: FolderSystem = {
    listFolder: [],
    selectFolder: [],
    listFile: [],
    loadingFetchFolder: false,
};

export const folderSlice = createSlice({ 
    name: 'folder-system',
    initialState,
    reducers: {
        // ACTION LOADING
        setLoadingFetchFolder: (state) => {
            return {
                ...state,
                loadingFetchFolder: true,
            }
        },
        // ACTION HANDLE CALL API
        fetchFolderSuccess: (state, { payload }) => {
            return {
                ...state,
                listFolder: payload && payload.length > 0 ? payload.filter((pl: any) => pl.folder_name) : [],
                listFile: payload && payload.length > 0 ? payload.filter((pl: any) => !pl.folder_name) : [],
                loadingFetchFolder: true,
            }
        },
        fetchFolderFailed: (state, { payload }) => {
            return {
                ...state,
                loadingFetchFolder: false,
            }
        },
        // ACTION HANDLE UI
        addFolderSelected: (state, { payload }) => {
            return {
                ...state,
                selectFolder: state.selectFolder.concat(payload),
            }
        },
        setFolderSelected: (state, { payload }) => {
            return {
                ...state,
                selectFolder: payload,
            }
        }
    },
});

export const { 
    setLoadingFetchFolder,
    fetchFolderSuccess,
    fetchFolderFailed,
    setFolderSelected,
    addFolderSelected
} = folderSlice.actions;

export default folderSlice.reducer;
