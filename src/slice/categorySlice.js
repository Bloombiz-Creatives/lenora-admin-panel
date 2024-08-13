import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        loading: true,
        error: null,
    },
    reducers: {
        catAddRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null
            }
        },
        catAddSuccess(state, action) {
            return {
                ...state,
                category: action.payload,
                pagination:action.payload,
            }
        },
        catAddFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        catEditRequets(state, action){
            return{
                ...state,
                loading:true,
                errorr:null
            }
        },
        catEditSuccess(state, action){
            return {
                ...state,
                loading:false,
                category:action.payload,
                error:null
            }
        },
        catEditFail(state,action){
            return{
                ...state,
                error:action.payload
            }
        },
        catGetAllRequest(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        catGetAllSuccess(state,action){
            return {
                ...state,
                loading:false,
                category:action.payload,
                error:null
            }
        },
        catGetAllFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
        catDeleteSuccess(state,action){
            return {
                ...state,
                loading:false,
                message:action.payload
            }
        },
        catDeleteFail(state,action){
            return {
                ...state,
                error:action.payload
            }
        }


    }
})

const { actions, reducer } = categorySlice;
export const {
    catAddRequest,
    catAddSuccess,
    catAddFail,
    catEditRequets,
    catEditSuccess,
    catEditFail,
    catGetAllRequest,
    catGetAllSuccess,
    catGetAllFail,
    catDeleteSuccess,
    catDeleteFail
} = actions;
export default reducer;