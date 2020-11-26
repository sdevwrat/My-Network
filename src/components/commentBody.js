import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
    cardHeader: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    },
    commentContent: {
      backgroundColor: '#CFD8DC',
      borderRadius: '10px',
      padding: theme.spacing.unit
    },
    commentText: {
      fontWeight: '400'
    },
    commenter: {
      fontWeight: '800'
    },
    link: {
      color: '#000',
      textDecoration: 'none'
    },
    timestamp: {
      fontSize:"11px"
    }
  });
  

class CommentBody extends Component {
    state = {
      name: ''
    };
  
    componentDidMount = () => {
      const { comment, getUser } = this.props;
      getUser(comment.commenterId).then((res) => {
        this.setState({
          name: res.payload.user.name
        });
      });
    };

    render(){
        const {classes,comment} = this.props;
        const {name} = this.state;
        return (
            <CardHeader 
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {name.charAt(0)}
                </Avatar>
              }
            title = {
                <div className={classes.commentContent}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                         <div style={{ flexDirection: 'column' }}>
                            <div className={classes.commenter}>
                                <Link className={classes.link} to={`/login`}>
                                    {name}
                                </Link>
                             </div>
                        <div className={classes.timestamp} >
                          {moment(comment.createdAt).fromNow()}
                        </div>
                        </div>
                    </div>
                    <div className={classes.commentText}>{comment.text}</div>
              </div>
            }
           />
        )
    }
}

export default withStyles(styles)(CommentBody);