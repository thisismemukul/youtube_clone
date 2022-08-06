import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
            state.error = ''
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
        },
        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        signupStart: (state) => {
            state.loading = true
            state.error = ''
        },
        signupSuccess: (state) => {
            state.loading = false
        },
        signupFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            return initialState;
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                );
            } else {
                state.currentUser.subscribedUsers.push(action.payload);
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure, logout, subscription } = userSlice.actions

export default userSlice.reducer