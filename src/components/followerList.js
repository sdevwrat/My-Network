import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

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

class FollowerList extends Component {
  state = {
    user: {}
  };
  componentDidMount = () =>{
      const {id,getUser} = this.props;
      getUser(id).then((res) =>{
          this.setState({
              user:res.payload.user
          })
      })
  }

  render() {

    const {user} = this.state;

    return (
        <Link to={`/profile/${user._id}`} style={{color:"inherit"}}>
        <ListItem style={{borderLeft:"1px solid green",marginBottom:"4px"}}>
        <ListItemAvatar>
          <Avatar src = {`https://robohash.org/${user.email}`} style={{marginBottom:"12px"}}/>
        </ListItemAvatar>
        <ListItemText
          primary={user.name}
        />
      </ListItem>
      </Link>
    );
  }
}

export default FollowerList;
