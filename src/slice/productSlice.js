import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'product',
    initialState:{
        loading: true,
        error: null,
    },
    reducers:{
        getProductsSuccess(state, action ){
            return {
                ...state,
                loading:false,
                products:action.payload
            }
        },
        getProductsFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
        deleteProdSuccess(state, action){
            return {
                ...state,
                loading:false,
                message:action.payload
            }
        },
        deleteProdFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
        todaysDealSuccess(state, action){
            return {
                ...state,
                loading:false,
                products:action.payload
            }
        },
        todaysDealFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
        prodAddSuccess(state, action){
            return {
                ...state,
                loading:false,
                product:action.payload,
            }
        },
        prodAddFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
        getParent_catSuccess(state, action){
            return {
                ...state,
                loading:false,
                distinctParentCategories:action.payload
            }
        },
        getParent_catFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
        getSubSuccess(state, action){
            return {
                ...state,
                loading:false,
                categories:action.payload.categories,
                error: null,
            }
        },
        getSubFail(state, action){
            return {
                ...state,
                error: action.payload.message || "Failed to fetch subcategories",
            }
        }
    }
})

const {actions, reducer} = productSlice;
export const {
    getProductsSuccess,
    getProductsFail,
    deleteProdSuccess,
    deleteProdFail,
    todaysDealSuccess,
    todaysDealFail,
    prodAddSuccess,
    prodAddFail,
    getParent_catSuccess,
    getParent_catFail,
    getSubSuccess,
    getSubFail,
} = actions;
export default reducer;