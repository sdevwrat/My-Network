import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { registerUser } from '../actions/authAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });


class registerPage extends Component{

    constructor(){
        super();
        this.state = {
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
            errors:{},
            registered:false,
            success:false
        };
    };

    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value,
            errors:{},
            success:false,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loading:false
        })
        if(nextProps.error.success){
            this.setState({
                success:true,
                loading : false,
            })
        }
        if(nextProps.error){
            const message = nextProps.error.error;
            this.setState({
                errors:{message},
                loading : false
            })
        }
      }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email);
      }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            loading:true
        })
        const {name,email,password,confirmPassword} = this.state;

        let message = "";

        if(!name || !email || !password || !confirmPassword){
            message = 'Please fill all the required fields'
        }

        if(!message && this.validateEmail(email) === false){
            message = 'Not a valid Email Address'
            this.setState({email : ''});
        }
        
        if(!message && password !== confirmPassword){
            message = 'Passwords do not match.'
        }

        if(message){
            this.setState({
                password:'',
                confirmPassword:'',
                errors:{message},
                loading:false
            });
            return ;
        }
        this.props.createUser({name,email,password});
    };

    render(){

        const { classes } = this.props;

        const {errors,name,email,password,confirmPassword,success,loading} = this.state;

        return (
            <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            {errors.message && 
                        <Alert severity="error" >
                        {errors.message}
                    </Alert>
            }
            {success && 
                <Alert severity="success">
                    You have been registered successfully.<NavLink to='/login'>Click Here</NavLink> to Sign In.
                </Alert>
            }
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value = {name}
                onChange={this.handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                value = {email}
                onChange={this.handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value = {password}
                onChange={this.handleChange}
              />
              
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value = {confirmPassword}
                onChange={this.handleChange}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled = {loading || success}
              >
                {!!loading && <CircularProgress style={{marginRight:"14px"}} color="primary" size="0.9rem" />}
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                    already have an account? <NavLink to="/login">Sign In</NavLink>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
        )
    }
}

const mapStateToProps = state =>({
    auth:state.authReducer,
    error:state.errorReducer
});

const mapDispatchToProps = dispatch =>({
    createUser:user => dispatch(registerUser(user))
})

export default compose(
    withStyles(useStyles),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(registerPage);