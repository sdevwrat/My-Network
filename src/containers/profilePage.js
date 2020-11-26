import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/profilePage.css'
import {connect}  from 'react-redux';
import PostFeed from '../components/postFeed';
import Loading from '../components/loading';
import {getUser,followUser,unfollowUser, getFollowers, getFollowing} from '../actions/userAction';
import NavBar from './navBar'

class ProfilePage extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            loading:true,
            pageUser:{}
          };
    }

    componentDidMount = async() =>{
        if(!localStorage.jwtToken)
            return this.props.history.push('/login');
        const {getUser,match} = this.props;
         
       getUser(match.params.id).then(res => {
           this.setState({
                pageUser:res.payload.user,
                loading:false   
           })
       });

    }

    handleFollow = async (follows) =>{
        const {signedInUser,followUser,unFollowUser,match} = this.props;
        if(follows)
            await unFollowUser(signedInUser.userId,match.params.id)
        else
            await followUser(signedInUser.userId,match.params.id)
        await this.props.getUser(match.params.id).then(res => {
            this.setState({
                pageUser:res.payload.user
            })
        });
    }
    goToFollowing = () =>{
        this.props.history.push('/followings');
    }

    goToFollowers = () =>{
        this.props.history.push('/followers')
    }
  
    render(){
        const {loading,pageUser} = this.state;
        const {signedInUser,match} = this.props;
        const postCount = this.props.posts.filter(post => post.authorId === match.params.id).length;
        return loading ? (
            <>
            <Loading />
            <NavBar />
            </>
        ) : (
            <>
            <NavBar />
            <div  style={{width:"100%",height:"auto"}}>
                <div class="bg-white shadow rounded overflow-hidden">
                    <div class="px-4 pt-0 pb-4 cover">
                        <div class="media align-items-end profile-head mb-2">
                            <div class="profile mr-3"><img src={`https://robohash.org/${pageUser.email}`} alt="..." width="130" class="rounded mb-2 img-thumbnail" />
                            {(signedInUser.userId !== match.params.id) && <button 
                                onClick = {() => this.handleFollow(pageUser.followers.includes(signedInUser.userId))}
                                class="btn btn-outline-dark btn-sm btn-block" style={{color:"white"}}>
                                    {pageUser.followers.includes(signedInUser.userId)?"Unfollow":"Follow"}
                             </button>}
                            </div>
                            <div class="media-body mb-5 text-white">
                                <h4 class="mt-0 mb-0">{pageUser.name}</h4>
                                <p class="small mb-4"> <i class="fas fa-map-marker-alt "></i>{pageUser.email}</p>
                            </div>
                        </div>
                        <hr style={{background:"white",width:"45%",marginRight:"0"}}/>
                        <div class="d-flex justify-content-end text-center">
                        <ul class="list-inline" style={{color:"white"}}>
                            <li class="list-inline-item mr-4">
                                <h2 class="font-weight-bold d-block">{postCount}</h2><small class="text-muted"> <i class="fas fa-image "></i>Posts</small>
                            </li>
                            <li class="list-inline-item mr-4 white" onClick = {signedInUser.userId === match.params.id?this.goToFollowers:null} style={{cursor:(signedInUser.userId === match.params.id)?"pointer":""}}>
                                <h2 class="font-weight-bold d-block">{pageUser.followers.length}</h2><small class="text-muted"> <i class="fas fa-user "></i>Followers</small>
                            </li>
                            <li class="list-inline-item white" onClick = {signedInUser.userId === match.params.id?this.goToFollowing:null} style={{cursor:signedInUser.userId === match.params.id?"pointer":""}}>
                                <h2 class="font-weight-bold d-block">{pageUser.following.length}</h2><small class="text-muted"> <i class="fas fa-user"></i>Following</small>
                            </li>
                        </ul>
                    </div>
                    </div>
                    {(signedInUser.userId === match.params.id) && <PostFeed showMyPosts = {true}/>}
                </div>
        </div>
        </>
        )
    }
}

const mapStateToProps = state =>({
   signedInUser:state.authReducer.user,
   posts: state.postReducer.posts
});

const mapDispatchToProps = dispatch => ({
    getUser:id => dispatch(getUser(id)),
    followUser: (userId,idToFollow) => dispatch(followUser(userId,idToFollow)),
    unFollowUser: (userId,idToUnfollow) => dispatch(unfollowUser(userId,idToUnfollow)),
    getFollowers: id => dispatch(getFollowers(id)),
    getFollowing: id => dispatch(getFollowing(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);