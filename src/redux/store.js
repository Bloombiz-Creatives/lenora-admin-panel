import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from '../slice/userSlice';


const reducer = combineReducers({
    userState:userReducer,
})

const store = configureStore({
    reducer,
})

export default store;