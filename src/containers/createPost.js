import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import { createPost } from '../actions/postAction';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '16px'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 500
    }
  });

class CreatePost extends Component{
    constructor(){
        super();
        this.state = {
            postText:'',
        };
    };

    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log("posted");
        this.props.createpost(this.state.postText,this.props.user);
        this.setState({postText:''})
    }

    render(){
        const {postText} = this.state;
        const { classes } = this.props;
        return (
    <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          name="postText"
          placeholder="What's on your mind?"
          multiline
          className={classes.textField}
          margin="normal"
          rowsMax="5"
          value={postText}
          onChange={this.handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Post
        </Button>
      </form>
        );
    }
}

const mapStateToProps = state =>({
    user:state.authReducer.user
});

const mapDispatchToProps = dispatch =>({
    createpost:(text,user) =>dispatch(createPost(text,user))
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps,mapDispatchToProps)
)(CreatePost);

