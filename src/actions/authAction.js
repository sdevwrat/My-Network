import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../setAuthToken';
import api from '../api';
import {
    IND_NO_ERRORS,
    GET_ERRORS,
    SET_CURR_USER
} from './actionType';

export const registerUser = user => (dispatch) =>{
    axios
        .post(api.register,user)
        .then((res) =>{
            dispatch({
                type: IND_NO_ERRORS,
                payload:{
                    success:true
                }
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
};

export const loginUser = user => (dispatch) =>{
    axios   
        .post(api.login,user)
        .then((res) => {
            const {token} = res.data;
            localStorage.setItem('jwtToken',token);
            setAuthToken(token)
            const decoded = jwtDecode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch((err) => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            });
        });
};

export const setCurrentUser = decoded => ({
    type:SET_CURR_USER,
    payload:decoded,
});

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    window.location.href = '/login';
};