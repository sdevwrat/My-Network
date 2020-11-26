import {SET_CURR_USER} from '../actions/actionType';
import isNull from '../isNull';

const initialState = {
    isAuthenticated:false,
    user:{}
}

export default function(state = initialState,action){
    switch(action.type){
        case SET_CURR_USER:
            return{
                ...state,
                isAuthenticated: !isNull(action.payload),
                user:action.payload
            };
            default:
                return state;
    }
}