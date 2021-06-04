import React from 'react';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { loginUser } from '../actions/authAction';
import {NavLink} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

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

class SignIn extends React.Component {

    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            errors:{},
            loading:false
        };
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push('/');
        }
    
        if (nextProps.error) {
        const {message} = nextProps.error;
          this.setState({
            errors: {message},
            password : "",
            loading:false
          });
        }
      };

    componentDidMount = () => {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/');
        }
    };
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value,
            errors:{}
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading:true,
        })
        const {email,password} = this.state;

        if(!email || !password ){
            const message = 'Please fill all the required fields'
            this.setState({
                password:'',
                confirmPassword:'',
                errors:{message},
                loading:false
            });
            return ;
        }

        const user = {
            email,password
        }
        this.props.signIn(user);
    };

  render(){
    const { classes } = this.props;
    const {errors,email,password,loading} = this.state;
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                {errors.message && 
                    <Alert severity="error">
                        {errors.message}
                    </Alert>
                }
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value = {email}
                autoComplete="email"
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
                autoComplete="current-password"
                onChange={this.handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled = {loading}
              >
                  
                {!!loading && <CircularProgress style={{marginRight:"14px"}} color="primary" size="0.9rem" />}
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                    Don't have an account? <NavLink to="/register">Sign Up</NavLink>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      );
  }
}

const mapStateToProps = state =>({
    auth:state.authReducer,
    error:state.errorReducer
});

const mapDispatchToProps = dispatch =>({
    signIn :user => dispatch(loginUser(user))
})

export default compose(
    withStyles(useStyles),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(SignIn);