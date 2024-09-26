import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'admin',
    initialState:{
        loading:true,
        isAuthenticated: false,
        error: null,
        user: null,
    },
    reducers:{
        logoutSuccess(state) {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
            }
        },
        logoutFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        forgetPassRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        forgetPassSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                email: action.payload.email,
            }
        },
        forgetPassFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        otpVerifySuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        },
        otpVerifyFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        },
        resetPasswordFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
    }
})

const {actions, reducer} = userSlice;
export const {
    forgetPassRequest,
    forgetPassSuccess,
    forgetPassFail,
    otpVerifySuccess,
    otpVerifyFail,
    resetPasswordSuccess,
    resetPasswordFail,
    logoutSuccess,
    logoutFail,
} = actions;
export default reducer;