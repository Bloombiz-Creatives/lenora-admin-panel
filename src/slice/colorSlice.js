import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
    name:'color',
    initialState:{
        loading:true,
        error:null,
    }, 
    reducers:{
        colorAddSuccess(state, action){
            return {
                ...state,
                loading:false,
                color:action.payload,
            }
        },
        colorAddFail(state, action){
            return {
                ...state,
                error: action.payload
            }
        },
        fetchColorSuccess(state, action){
            return {
                ...state,
                loading:false,
                color:action.payload,
            }
        },
        fetchColorFail(state, action){
            return {
                ...state,
                error: action.payload
            }
        },
        deleteColorSuccess(state, action){
            return {
                ...state,
                loading:false,
                message:action.payload
            }
        },
        deleteColorFail(state, action){
            return {
                ...state,
                error: action.payload
            }
        },
        editColorSuccess(state, action){
            return {
                ...state,
                loading:false,
                color:action.payload,
            }
        },
        editColorFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },


    }
})

const {actions, reducer} = colorSlice;
export const {
    colorAddSuccess,
    colorAddFail,
    fetchColorSuccess,
    fetchColorFail,
    deleteColorSuccess,
    deleteColorFail,
    editColorSuccess,
    editColorFail,
} = actions;
export default reducer;

