import {IND_NO_ERRORS ,GET_ERRORS} from '../actions/actionType';

const initialState = {};

export default function (state=initialState,action){
    if(action.type === IND_NO_ERRORS || action.type === GET_ERRORS)
        return action.payload;
    return state;
}