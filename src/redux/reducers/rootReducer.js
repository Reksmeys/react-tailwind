import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import { profileReducer } from "./profileReducer";

//
export const rootReducer = combineReducers({
    productR: productReducer,
    authR: authReducer,
    msgR: messageReducer,
    profileR: profileReducer
})
