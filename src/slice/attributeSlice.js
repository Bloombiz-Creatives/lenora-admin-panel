import { createSlice } from "@reduxjs/toolkit";

const attributeSlice = createSlice({
    name: 'attribute',
    initialState: {
        loading: true,
        error: null,
    },
    reducers: {
        attributeFetchRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        attributeFetchSuccess(state, action) {
            return {
                ...state,
                loading: false,
                attribute: action.payload,
                error: null
            }
        },
        attributeFetchFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        nameSuccess(state, action) {
            return {
                ...state,
                loading: false,
                attribute: action.payload,
            }
        },
        nameFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        deleteSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        },
        deleteFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        nameEditSuccess(state, action) {
            return {
                ...state,
                loading: false,
                attribute: action.payload,
            }
        },
        nameEditFail(state, action){
            return {
                ...state, 
                error:action.payload
            }
        },
        updateValueSuccess(state, action){
            return {
                ...state,
                loading:false,
                attribute:action.payload
            }
        },
        updateValueFail(state, action){
            return {
                ...state,
                error:action.payload
            }
        },
    }
})

const { actions, reducer } = attributeSlice;
export const {
    attributeFetchRequest,
    attributeFetchSuccess,
    attributeFetchFail,
    nameSuccess,
    nameFail,
    deleteSuccess,
    deleteFail,
    nameEditSuccess,
    nameEditFail,
    updateValueSuccess,
    updateValueFail,
} = actions;
export default reducer;