import axios from "axios"
import { actionTypes } from "./actionTypes"
import { API_URL } from "../../utils/constant"

// contain all action related to products
export const fetchProfile = (token) => {
    return (dispatch) => {
        axios(`${API_URL}auth/profile`, {
            headers: {
                "Authorization" : `bearer ${token}`
            }
        })
        .then(resp => dispatch({
            type: actionTypes.GET_PROFILE,
            payload: resp.data
        }))
        .catch(er => {
            console.log('in fetch product', er)
        })
    }
}