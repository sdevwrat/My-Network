import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  link: {
    outline: 'none',
    textDecoration: 'none',
    color:'black'
  },
  menuButton: {
    color: '#fff',
    fontSize: '18px',
    marginRight: '-15px',
    textTransform: 'none'
  }
};

class NavBarMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, logoutUser, user } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'right-menu' : null}
          aria-haspopup="true"
          className={classes.menuButton}
          onClick={this.handleClick}
        >
          <Avatar alt="Remy Sharp"  className={classes.avatar} src={`https://robohash.org/${user.email}`} />
          <h5 style={{padding:"6px 0 0 5px"}}>{user.name}</h5>
        </Button>
        <Menu
          id="right-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
         <a className={classes.link} href="/">
            <MenuItem onClick={this.handleClose}>Home</MenuItem>
          </a>
          <a className={classes.link} href={`/profile/${user.userId}`}>
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          </a>
          <a className={classes.link} href="/discover">
            <MenuItem onClick={this.handleClose}>Discover</MenuItem>
          </a>
          <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(NavBarMenu);
