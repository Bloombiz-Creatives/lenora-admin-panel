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
        }
    }
})

const {actions, reducer} = productSlice;
export const {
    getProductsSuccess,
    getProductsFail,
} = actions;
export default reducer;