import { createSlice } from "@reduxjs/toolkit";

const websiteSlice = createSlice({
    name:'website',
    initialState:{
        loading:true,
        error:null,
    },
    reducers:{
        homeHeroGetRequest(state, action){
            return {
                ...state,
                loading:true
            }
        },
        homeHeroGetSuccess(state, action){
            return {
             ...state,
             loading:false,
             hero:action.payload,
             error:null
            }
        },
        homeHeroGetFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
        homeHeroEditRequest(state, action){
            return {
                ...state,
                loading:true
            }
        },
        homeHeroEditSuccess(state, action){
            return {
                ...state,
                loading:false,
                hero:action.payload,
                message:action.payload,
                error:null
            }
        },
        homeHeroEditFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
    }
})

const {actions, reducer} = websiteSlice;
export const {
    homeHeroGetRequest,
    homeHeroGetSuccess,
    homeHeroGetFail,
    homeHeroEditRequest,
    homeHeroEditSuccess,
    homeHeroEditFail,
} = actions;
export default reducer;