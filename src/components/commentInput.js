import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    button: {
      marginBottom: theme.spacing.unit,
      marginLeft: theme.spacing.unit
    },
    cardHeader: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    },
    cardHeaderTitle: {
      display: 'flex'
    },
    commentField: {
      width: '90%',
      marginLeft: theme.spacing.unit,
      marginTop: theme.spacing.unit
    }
  });

class CommentInput extends Component {
    constructor(){
        super();
        this.state = {
            text:'',
            name:''
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentDidMount = () => {
        const { commenterId, getUser } = this.props;
        getUser(commenterId).then((res) => {
          this.setState({
            name: res.payload.user.name
          });
        });
      };

    postComment = (e) =>{
        e.preventDefault();
        if(this.state.text.trim() === '')
            return;
        this.props.addComment(this.props.commenterId,this.props.postId,this.state.text);
        this.setState({
            text:''
        })
    }

    render(){
        const {classes} = this.props;
        return (
            <CardHeader className={classes.CardHeader}
            title = {
                <div className={classes.cardHeaderTitle}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                          {this.state.name.charAt(0)}
                    </Avatar>
                    <TextField
                        multiline
                        placeholder="Write a comment"
                        className={classes.commentField}
                        onChange={this.handleChange}
                        name="text"
                        value={this.state.text}
                    />
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={this.postComment}
                        >
                    <SendIcon />
                    </Button>
                </div>
                }
            />
        )
    }
}

export default withStyles(styles)(CommentInput);