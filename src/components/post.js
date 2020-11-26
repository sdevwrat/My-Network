import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import LikeIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';

import Comments from './comments';

const styles = theme => ({
    actions:{
        display:'flex'
    },
    card:{
        margin:'20px auto',
        width:"70%",
    },
    link: {
        color: '#000',
        textDecoration: 'none'
      },
})

class Post extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            openComments:false
        }
    };

    componentDidMount = async() =>{
        const {post,getUser} = this.props;
           await getUser(post.authorId).then((res) => {
                if(res){
                    console.log("cr",res);
                    this.setState({
                        email:res.payload.user.email
                    });
                }
            });
    };

    handleOpenComment = () =>{
        this.setState({
            openComments:!this.state.openComments
        })
    }

    render(){
        const {classes,post,userId,updatePostLikes,getUser,addComment} = this.props;
        const relativeTime = moment(post.createdAt).fromNow();
        return (
            <Card className={classes.card}>
                <CardHeader 
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} src={`https://robohash.org/${this.state.email}`} />
                      }
                      action={
                         post.authorId === userId ? 
                        (<IconButton aria-label="settings">
                          <DeleteIcon color="secondary" onClick = {() => this.props.deletePost(post._id)}/>
                        </IconButton>):null
                      }
                    title={
                    <Link className={classes.link} to={'/login'}>
                        {post.author}
                    </Link>
                    }
                    subheader={relativeTime}
                />
                <CardContent>
                    <Typography>{post.text}</Typography>
                </CardContent>
                <CardActions className = {classes.actions} disableActionSpacing>
                    <div>
                        <IconButton aria-label='Like'
                        onClick = {() => post.likers.includes(userId)?updatePostLikes('unlike',post._id,userId)
                        : updatePostLikes('like',post._id,userId)}
                        >
                            <LikeIcon 
                            style={
                                post.likers.includes(userId) ? { color: '#3f51b5' } : null
                              }
                            />
                        </IconButton>
                        {post.likesCount}
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <IconButton onClick = {this.handleOpenComment}>
                            <CommentIcon />
                        </IconButton>
                        {post.comments.length}
                    </div>
                </CardActions>
                <Collapse in={this.state.openComments} timeout="auto" unmountOnExit>
                    <Comments
                        comments = {post.comments}
                        postId = {post._id}
                        commenterId = {userId}
                        addComment = {addComment}
                        getUser = {getUser}
                    />
                </Collapse>
            </Card>
        );
    }
}

export default withStyles(styles)(Post);