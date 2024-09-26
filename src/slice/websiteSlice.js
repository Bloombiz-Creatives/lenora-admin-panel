import { createSlice } from "@reduxjs/toolkit";

const websiteSlice = createSlice({
    name: 'website',
    initialState: {
        loading: true,
        error: null,
    },
    reducers: {
        homeHeroGetRequest(state) {
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
        homeHeroEditRequest(state) {
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
        subGetRequest(state) {
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
        subEditRequest(state) {
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
        promoGetRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        promoGetSuccess(state, action) {
            return {
                ...state,
                loading: false,
                promo: action.payload,
                error: null
            }
        },
        promoGetFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        promoEditRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        promoEditSuccess(state, action) {
            return {
                ...state,
                loading: false,
                promo: action.payload,
                message: action.payload,
                error: null
            }
        },
        promoEditFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        pgcntntGetRequets(state){
            return{
                ...state,
                loading:true,
                errorr:null
            }
        },
        pgcntntGetSuccess(state, action){
            return {
                ...state,
                loading:false,
                pageContent:action.payload,
                error:null
            }
        },
        pgcntntGetFail(state,action){
            return{
                ...state,
                error:action.payload
            }
        },
        pgcntntEditRequets(state){
            return{
                ...state,
                loading:true,
                errorr:null
            }
        },
        pgcntntEditSuccess(state, action){
            return {
                ...state,
                loading:false,
                pageContent:action.payload,
                error:null
            }
        },
        pgcntntEditFail(state,action){
            return{
                ...state,
                error:action.payload
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
    promoGetRequest,
    promoGetSuccess,
    promoGetFail,
    promoEditRequest,
    promoEditSuccess,
    promoEditFail,
    pgcntntGetRequets,
    pgcntntGetSuccess,
    pgcntntGetFail,
    pgcntntEditRequets,
    pgcntntEditSuccess,
    pgcntntEditFail,
} = actions;
export default reducer;