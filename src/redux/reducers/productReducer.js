/*
reducer handle on: 
    check request type and return appropriate state
*/

import { actionTypes } from "../actions/actionTypes"

// must have initialState
const initialState = {
    products: [],
    isLoading: true
}

export const productReducer = (state = initialState, action) =>{
    // checking request 
    let {type, payload} = action
    switch(type){
        case actionTypes.GET_PRODUCTS:
            return {...state, products: payload, isLoading: false}
        default: 
            return state
    }
}
