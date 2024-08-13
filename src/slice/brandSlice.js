import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
    name:'brand',
    initialState:{
        loading:true,
        error:null,
    },
    reducers:{
        brandAddRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null
            }
        },
        brandAddSuccess(state, action) {
            return {
                ...state,
                brand: action.payload,
                loading:false
            }
        },
        brandAddFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        brandGetAllRequest(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        brandGetAllSuccess(state,action){
            return {
                ...state,
                loading:false,
                brand:action.payload,
                error:null
            }
        },
        brandGetAllFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
        brandDeleteSuccess(state,action){
            return {
                ...state,
                loading:false,
                message:action.payload
            }
        },
        brandDeleteFail(state, action) {
            return {
                ...state,
                error:action.payload
            }
        }
    }
})

const {actions, reducer} = brandSlice;
export const {
    brandAddRequest,
    brandAddSuccess,
    brandAddFail,
    brandGetAllRequest,
    brandGetAllSuccess,
    brandGetAllFail,
    brandDeleteSuccess,
    brandDeleteFail
} = actions;
export default reducer;