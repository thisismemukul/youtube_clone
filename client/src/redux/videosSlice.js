import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allVideos: null,
    loading: false,
    error: '',
};

export const videosSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        fetchAllStart: (state) => {
            state.loading = true;
        },
        fetchAllSuccess: (state, action) => {
            state.loading = false;
            state.allVideos = action.payload;
        },
        fetchAllFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchAllStart, fetchAllSuccess, fetchAllFailure } = videosSlice.actions;

export default videosSlice.reducer;