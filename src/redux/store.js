import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from '../slice/userSlice';
import categoryReducer from '../slice/categorySlice';



const reducer = combineReducers({
    userState:userReducer,
    categoryState:categoryReducer,

})

const store = configureStore({
    reducer,
})

export default store;