import {
    GET_POST,
    CREATE_POST,
    DELETE_POST,
    UPDATE_POST_LIKES,
    ADD_COMMENT
  } from '../actions/actionType';

  const initState = {
      posts : []
  };

  export default function(state=initState,action){
      switch(action.type){
        case GET_POST:
            return {
              ...state,
              posts: action.payload
            };
        case CREATE_POST:
            return {
                ...state,
                posts:[
                    {
                        _id:action.payload._id,
                        author:action.payload.author,
                        authorId:action.payload.authorId,
                        comments:[],
                        likers:action.payload.likers,
                        likesCount:action.payload.likesCount,
                        text:action.payload.text,
                        timestamp:action.payload.timestamp
                    },
                    ...state.posts
                ]
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(({ _id }) => _id !== action.id)
            };
        case UPDATE_POST_LIKES:
            return {
                ...state,
                posts:state.posts.map((post) =>{
                    if(post._id === action.payload._id){
                        return{
                            ...post,
                            likers:action.payload.likers,
                            likesCount:action.payload.likesCount
                        };
                    }
                    return post;
                })
            };
        case ADD_COMMENT:
            return {
                ...state,
                posts:state.posts.map((post) => {
                    if(post._id == action.payload._id)
                        return {
                            ...post,
                            comments:[
                                ...post.comments,
                                {
                                    _id:action.payload.comments[action.payload.comments.length - 1]._id,
                                    commenterId: action.commenterId,
                                    text: action.text
                                }
                            ]
                        }
                    return post;
                })
            };
        default:
            return state;
      }
  }