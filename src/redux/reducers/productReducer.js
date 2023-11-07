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
    let {SEARCH_PRODUCT, GET_PRODUCTS} = actionTypes
    switch(type){
        case GET_PRODUCTS:
            return {...state, products: payload, isLoading: false}
        case SEARCH_PRODUCT:
            return {...state, products: payload, isLoading: false}
        default: 
            return state
    }
}
