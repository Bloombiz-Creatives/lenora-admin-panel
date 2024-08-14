import { createSlice } from "@reduxjs/toolkit";

const websiteSlice = createSlice({
    name: 'website',
    initialState: {
        loading: true,
        error: null,
    },
    reducers: {
        homeHeroGetRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        homeHeroGetSuccess(state, action) {
            return {
                ...state,
                loading: false,
                hero: action.payload,
                error: null
            }
        },
        homeHeroGetFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        homeHeroEditRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        homeHeroEditSuccess(state, action) {
            return {
                ...state,
                loading: false,
                hero: action.payload,
                message: action.payload,
                error: null
            }
        },
        homeHeroEditFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        subGetRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        subGetSuccess(state, action) {
            return {
                ...state,
                loading: false,
                subhero: action.payload,
                error: null
            }
        },
        subGetFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        subEditRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        subEditSuccess(state, action) {
            return {
                ...state,
                loading: false,
                subhero: action.payload,
                message: action.payload,
                error: null
            }
        },
        subEditFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
    }
})

const { actions, reducer } = websiteSlice;
export const {
    homeHeroGetRequest,
    homeHeroGetSuccess,
    homeHeroGetFail,
    homeHeroEditRequest,
    homeHeroEditSuccess,
    homeHeroEditFail,
    subGetRequest,
    subGetSuccess,
    subGetFail,
    subEditRequest,
    subEditSuccess,
    subEditFail,
} = actions;
export default reducer;