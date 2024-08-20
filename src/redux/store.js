import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from '../slice/userSlice';
import categoryReducer from '../slice/categorySlice';
import brandReducer from '../slice/brandSlice';
import websiteReducer from '../slice/websiteSlice';
import attributeReducer from '../slice/attributeSlice';
import colorReducer from '../slice/colorSlice';
import productReducer from '../slice/productSlice';



const reducer = combineReducers({
    userState:userReducer,
    categoryState:categoryReducer,
    brandState:brandReducer,
    websiteState:websiteReducer,
    attributeState:attributeReducer,
    colorState:colorReducer,
    productState:productReducer,

})

const store = configureStore({
    reducer,
})

export default store;