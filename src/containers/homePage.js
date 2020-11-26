import React,{Component} from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authAction';
import CreatePost from './createPost';
import PostFeed from '../components/postFeed';
import PropTypes from 'prop-types';
import NavBar from './navBar';

class HomePage extends Component {
    componentDidMount = () =>{
        if(!localStorage.jwtToken){
            this.props.history.push('/login');
        }
    };

    render() {
        return (
            <>
            <NavBar />
            <CreatePost />
            <PostFeed />
            </>
        );
    }
}

HomePage.propTypes = {
    history: PropTypes.object.isRequired
  };

const mapDispatchToProps = dispatch => ({
    logout:()=> dispatch(logoutUser())
})

export default connect(mapDispatchToProps)(HomePage);