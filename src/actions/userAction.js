import axios from 'axios';
import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USER,
  GET_ALL_USERS,
  UPDATE_FOLLOWERS,
  UPDATE_FOLLOWING
} from './actionType';
import api from '../api';

export const getAllUsers = () => async (dispatch) =>{
    const result = await axios.get(api.users);
    return dispatch({
        type:GET_ALL_USERS,
        payload:result.data
    });
};

export const getUser = (userId) => async (dispatch) =>{
    try{
        const result = await axios.get(`${api.users}/${userId}`);
        return dispatch({
            type: GET_USER,
            payload: result.data
        });
    }catch(err){
        return err;
    }
};

export const followUser = (followerId,idToFollow) => async (dispatch) =>{
    const followRes = await axios.patch(`${api.following}/${followerId}`,{idToFollow});
    const addFollowRes = await axios.patch(`${api.follower}/${idToFollow}`,{followerId});
    dispatch({
        type:UPDATE_FOLLOWERS,
        payload:addFollowRes.data,
    });
    return dispatch({
        type:UPDATE_FOLLOWING,
        payload:followRes.data
    });
};

export const unfollowUser = (followerId,idToUnfollow) => async (dispatch) =>{
    const unfollowRes = await axios.patch(`${api.unfollowing}/${followerId}`,{idToUnfollow});
    const removeFollowRes = await axios.patch(`${api.unfollower}/${idToUnfollow}`,{followerId});
    dispatch({
        type:UPDATE_FOLLOWERS,
        payload:removeFollowRes.data,
    });
    return dispatch({
        type:UPDATE_FOLLOWING,
        payload:unfollowRes.data
    });
};

export const getFollowers = userId => async (dispatch) => {
    const result = await axios.get(`${api.users}/${userId}`);
    return dispatch({
      type: GET_FOLLOWERS,
      payload: result.data
    });
  };
  
  export const getFollowing = userId => async (dispatch) => {
    const result = await axios.get(`${api.users}/${userId}`);
    return dispatch({
      type: GET_FOLLOWING,
      payload: result.data
    });
  };