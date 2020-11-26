import React ,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deletePost,
  getPosts,
  updatePostLikes,
  addComment
} from '../actions/postAction';
import classnames from 'classnames';
import * as moment from 'moment';
import Loading from './loading';
import { getFollowing, getUser } from '../actions/userAction';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';


import Post from './post';

class PostFeed extends Component {
    constructor(){
        super();
        this.state = {
            posts:[],
            loading:true,
        }
    }

    componentDidMount = async() =>{
        const {getPosts,getFollowing,user} = this.props;
        if(user){
        await getPosts().then(() => {
            getFollowing(user.userId).then((res) =>{
                const following = (res.payload && res.payload.user)?res.payload.user.following:[];
                this.setState({following,loading:false})
            })  
        });}
    }

    render(){
        const{loading,following} = this.state;
        const {user,getUser, updatePostLikes,addComment,deletePost} = this.props;
        return loading?(
            <Loading />
        ) :(
        <>
            {this.props.posts.map(post =>{
                return (!this.props.showMyPosts && following.includes(post.authorId)) || (post.authorId === user.userId)?(
                        <Post 
                            post = {post}
                            userId = {user.userId}
                            getUser={id => getUser(id)}
                            updatePostLikes={(action, postId, likerId) =>
                                updatePostLikes(action, postId, likerId)
                            }
                            addComment = {addComment}
                            deletePost = {deletePost}
                            />
                ):null
                
            })}
        </>
        );  
    }
}

PostFeed.propTypes = {
    addComment: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        authorId: PropTypes.string.isRequired,
        comments: PropTypes.array,
        likers: PropTypes.array.isRequired,
        likesCount: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
      })
    ),
    updatePostLikes: PropTypes.func.isRequired,
    getFollowing: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    user: PropTypes.shape({
      userId: PropTypes.string.isRequired
    }).isRequired
  };

const mapStateToProps = state =>({
    user:state.authReducer.user,
    posts:state.postReducer.posts
});

const mapDispatchToProps = dispatch => ({
    deletePost: id => dispatch(deletePost(id)),
    getPosts: () => dispatch(getPosts()),
    getUser: id => dispatch(getUser(id)),
    getFollowing : id => dispatch(getFollowing(id)),
    updatePostLikes: (action, postId, likerId) =>dispatch(updatePostLikes(action, postId, likerId)),
    addComment: (commenterId,postId,text) => dispatch(addComment(commenterId,postId,text))
});

export default connect(mapStateToProps,mapDispatchToProps)(PostFeed);


