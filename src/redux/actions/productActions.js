import axios from "axios"
import { API_URL } from "../../utils/constant"
import { actionTypes } from "./actionTypes"

// contain all action related to products
export const fetchAllProducts = () => {
    return (dispatch) => {
        axios(`${API_URL}products`)
        .then(resp => dispatch({
            type: actionTypes.GET_PRODUCTS,
            payload: resp.data
        }))
        .catch(er => {
            console.log('in fetch product', er)
        })
    }
}
export const searchProducts = (title) => {
    return (dispatch) => {
        axios(`${API_URL}products?title=${title}`)
        .then(resp => dispatch({
            type: actionTypes.SEARCH_PRODUCT,
            payload: resp.data
        }))
        .catch(er => {
            console.log('in search product', er)
        })
    }
}
