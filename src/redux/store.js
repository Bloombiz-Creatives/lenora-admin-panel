import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from '../slice/userSlice';
import categoryReducer from '../slice/categorySlice';
import brandReducer from '../slice/brandSlice';



const reducer = combineReducers({
    userState:userReducer,
    categoryState:categoryReducer,
    brandState:brandReducer,

})

const store = configureStore({
    reducer,
})

export default store;