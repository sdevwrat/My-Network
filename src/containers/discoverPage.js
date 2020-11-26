import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {
    followUser,
    getFollowing,
    getUser,
    getAllUsers,
    unfollowUser
} from '../actions/userAction';
import Loading from '../components/loading';
import UserCard from '../components/userCard';
import NavBar from './navBar';

const styles = theme => ({
    cardGrid: {
      padding: `${theme.spacing.unit * 4}px 0`
    },
    layout: {
      width: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3
      }
    }
  });

export class DiscoverPage extends Component {
    constructor(){
        super();
        this.state = {
            loading:true,
            following:[]
        }
    }

    componentDidMount = async () =>{
        await this.props.getAllUsers();
        this.setState({
            loading:false,
        });
    }

    render(){
        const {userReducer,classes,authReducer} = this.props;
        return this.state.loading?(
            <>
            <Loading />
            <NavBar />
            </>
        ):(
          <>
          <NavBar />
          <div className={classNames(classes.layout, classes.cardGrid)}>
              <Grid container justify="center">
                {userReducer.allUsers.map(
                  user =>{
                    return (
                      (user._id === authReducer.user.userId || user.followers.includes(authReducer.user.userId)) ? null : (
                      <Grid item key={user._id} >
                        <UserCard 
                          followUser = {this.props.followUser}
                          user = {user}
                          currUserId = {authReducer.user.userId}
                        />
                      </Grid>
                    ))}
                )}
              </Grid>
            </div>
          </>
        )
    }
}

const mapStateToProps = state => ({
    authReducer:state.authReducer,
    userReducer:state.userReducer
});

const mapDispatchToProps = dispatch =>({
    followUser: (userId,idToFollow) => dispatch(followUser(userId,idToFollow)),
    getAllUsers : () => dispatch(getAllUsers()),
});

export default compose(
    withStyles(styles),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(DiscoverPage);