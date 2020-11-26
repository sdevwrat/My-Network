import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';

import List from '@material-ui/core/List';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { getFollowers, getUser } from '../actions/userAction';
import FollowerList from '../components/followerList';
import NavBar from './navBar';

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
      },
      demo: {
        backgroundColor: theme.palette.background.paper,
      },
      title: {
        margin: theme.spacing(4, 0, 2),
      },
      grid:{
        marginLeft:"10%"
      }
  });

class follower extends Component{
    constructor(){
        super();
        this.state = {
            postText:'',
            followers:[]
        };
    };

    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.createpost(this.state.postText,this.props.user);
        this.setState({postText:''})
    }

    componentDidMount = async () =>{
       await this.props.getUser(this.props.signedInUser.userId).then(res =>{
           this.setState({
               followers:res.payload.user.followers
           })
       })
    }

    render(){
        const {followers} = this.state;
        const { classes,user,getUser } = this.props;
        return (
            <>
            <NavBar />
            <Grid item xs={12} md={6} className={classes.grid}>
            <Typography variant="h6" className={classes.title}>
                My Followers
            </Typography>
            <List dense={false}>
                 {followers.map(followerId => {
                    return (
                        <FollowerList 
                        getUser = {getUser}
                        id = {followerId}
                        />
                    )   
                })}
            </List>
            </Grid>
        </>
        );
    }
}

const mapStateToProps = state =>({
    signedInUser:state.authReducer.user,
    user:state.userReducer
});

const mapDispatchToProps = dispatch =>({
    getUser: id => dispatch(getUser(id)),
    getFollowers:id => dispatch(getFollowers(id))
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps,mapDispatchToProps)
)(follower);