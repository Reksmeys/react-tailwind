import { actionTypes } from "../actions/actionTypes"

// must have initialState
const initialState = {
    profile: {
        "avatar": "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
    },
}

export const profileReducer = (state = initialState, action) =>{
    // checking request 
    let {type, payload} = action
    let {GET_PROFILE} = actionTypes
    switch(type){
        case GET_PROFILE:
            return {...state, profile: payload}
        
        default: 
            return state
    }
}
