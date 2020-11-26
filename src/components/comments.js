import React, { Component } from 'react';
import PropTypes from 'prop-types';


import CommentInput from './commentInput';
import CommentBody from './commentBody';

class Comments extends Component {
    render(){
        const {addComment,commenterId,comments,postId,getUser,UserId} = this.props;
        return (
            <div>
            <hr />
            {!!comments.length && comments.map(comment =>(
                <CommentBody 
                key = {comment._id}
                comment = {comment}
                getUser = {getUser}
                />
            ))}
            <CommentInput
                addComment = {addComment}
                commenterId = {commenterId}
                postId = {postId}
                getUser = {getUser}
            />
        </div>
        )
    }
}

export default Comments;