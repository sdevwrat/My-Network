import axios from 'axios';
import {
    CREATE_POST,
    DELETE_POST,
    GET_POST,
    UPDATE_POST_LIKES,
    ADD_COMMENT,
} from './actionType';
import api from '../api';


export const getPosts = () => dispatch =>
  axios.get(api.posts).then(res =>
    dispatch({
      type: GET_POST,
      payload: res.data
    }));

export const createPost = (text,user) => dispatch =>{
    axios   
        .post(api.posts,{
            text,
            author:user.name,
            authorId:user.userId,
        })
        .then(res => 
         dispatch({
             type:CREATE_POST,
             payload:res.data
         })   
        );
};

export const updatePostLikes = (action, postId, likerId) => dispatch =>
  axios.patch(`${api.posts}/${postId}`, { action, id: likerId }).then(res =>
    dispatch({
      type: UPDATE_POST_LIKES,
      payload: res.data
    }));

export const deletePost = id => dispatch =>
  axios.delete(`${api.posts}/${id}`).then(res =>
    dispatch({
      type: DELETE_POST,
      id
}));

export const addComment = (commenterId,postId,text) => dispatch =>
      axios.patch(`${api.posts}/${postId}`,{action:"addComment" ,commenterId,text})
      .then(res =>
          dispatch({
            type:ADD_COMMENT,
            payload:res.data,
            commenterId,
            text
      }));