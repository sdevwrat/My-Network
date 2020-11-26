import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { registerUser } from '../actions/authAction';
import '../css/authPage.css'


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
        if(nextProps.error.success){
            this.setState({
                success:true
            })
        }
        if(nextProps.error){
            const message = nextProps.error.error;
            this.setState({
                errors:{message}
            })
        }
      }

    handleSubmit = async (e) => {
        e.preventDefault();

        const {name,email,password,confirmPassword} = this.state;
        
        if(password !== confirmPassword){
                const message = 'Passwords do not match.'
                this.setState({
                    password:'',
                    confirmPassword:'',
                    errors:{message}
                });
                return ;
        }
        this.props.createUser({name,email,password});
    };

    render(){

        const {errors,name,email,password,confirmPassword,success,loading} = this.state;

        return (
            <div class="container">
                <section id="content">
                    <form onSubmit = {this.handleSubmit} autoComplete = "off">
                        <h1>Create a new account</h1>
                        {errors.message && 
                            <p style={{textAlign:"left",marginLeft:"10%",border:"2px solid red",padding:"4px",maxWidth:"290px"}}>
                             {errors.message}
                            </p>
                        }
                        {success && 
                            <p style={{textAlign:"left",marginLeft:"10%",border:"2px solid green",padding:"4px",maxWidth:"290px"}}>
                                 You have been registered successfully.<NavLink to='/login'>CLick Here</NavLink> to login. 
                            </p>
                        }
                        <div>
                            <input type="text" placeholder="name" name="name" value={name} onChange={this.handleChange} required/>
                        </div>
                        <div>
                            <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} autocomplete="off" required/>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} required/>
                        </div>
                        <div>
                            <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} required/>
                        </div>
                        <div>
                            <input type="submit" value="Register" disabled={loading || success}/>
                            <NavLink to="/login">Log In</NavLink>
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
    createUser:user => dispatch(registerUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(registerPage);