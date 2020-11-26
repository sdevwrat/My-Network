import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { compose } from 'redux';
import { loginUser } from '../actions/authAction';
import '../css/authPage.css'


class registerPage extends Component{

    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            errors:{},
        };
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push('/');
        }
    
        if (nextProps.error) {
        const {message} = nextProps.error;
          this.setState({
            errors: {message}
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
        console.log("submitted")
        e.preventDefault();
        const {email,password} = this.state;
        const user = {
            email,password
        }
        this.props.signIn(user);
    };

    render(){
        const {errors,email,password} = this.state;

        return (
            <div class="container">
                <section id="content">
                    <form onSubmit = {this.handleSubmit}>
                        <h1>Login to your account</h1>
                        {errors.message && 
                            <p style={{textAlign:"left",marginLeft:"10%",border:"2px solid red",padding:"4px",maxWidth:"290px"}}>
                             {errors.message}
                            </p>
                        }
                        <div>
                            <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input type="submit" value="Log In"/>
                            <NavLink to="/register">Register</NavLink>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    auth:state.authReducer,
    error:state.errorReducer
});

const mapDispatchToProps = dispatch =>({
    signIn :user => dispatch(loginUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(registerPage);