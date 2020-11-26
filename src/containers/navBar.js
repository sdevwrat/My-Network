import React,{Component} from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authAction';
import { compose } from 'redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import NavBarMenu from '../components/navBarMenu';


const styles = {
    
    flex: {
      flexGrow: 1
    },
    logo: {
      color: '#fff',
      textDecoration: 'none'
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    root: {
      flexGrow: 1
    }
};

class NavBar extends Component {
    render() {
        const {classes,user,logout} =this.props;
        return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Typography
                    className={classes.flex}
                    variant="title"
                    color="inherit"
                >
                <a className={classes.logo} href="/">
                    My Network
                </a>
                </Typography>
                <div >
                    <NavBarMenu logoutUser={logout} user={user} />
                </div>
                </Toolbar>
            </AppBar>
      </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.authReducer.user
  });

const mapDispatchToProps = dispatch => ({
    logout:()=> dispatch(logoutUser())
})

export default compose(
    withStyles(styles),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(NavBar);