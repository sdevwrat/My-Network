import React, { Component } from 'react';
import '../css/userCard.css';
import { Link } from 'react-router-dom';

class UserCard extends Component {
    state = {
      name: ''
    };
  
    render(){
        const {user} = this.props;
        const ava = `https://robohash.org/${user.email}`
        return (
                <div class="center">
                        <div class="profile">
                            <div class="image">
                                <img src={ava} width="70" height="70" alt="ava" />
                            </div>
                            <div class="name">{user.name}</div>
                            <div class="actions">
                            <Link to={`/profile/${user._id}`}>
                                <button class="btn">View</button>
                            </Link>
                                <button class="btn" onClick = {() => this.props.followUser(this.props.currUserId,user._id)}>Follow</button>
                            </div>
                        </div>
                        
                        <div class="stats">
                            <div class="box" >
                                <span class="value">{user.followers.length}</span>
                                <span class="parameter">Followers</span>
                            </div>
                            <div class="box">
                                <span class="value">{user.following.length}</span>
                                <span class="parameter">Following</span>
                            </div>
                        </div>
                </div>
        )
    }
}

export default UserCard;