import React from 'react';
import { Link } from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types'; 

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }
    onSubmit(e){
        e.preventDefault();
        let email = this.emailRef.current.value.trim();
        let password = this.passwordRef.current.value.trim();

        if (password.length < 5) {
            return this.setState ({error: 'Password must be at least 5 characters long.'})
        }

        this.props.createUser({email, password}, (err)=>{
            if(err){
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
            }
        })

        // this.setState({
        //     error: 'Something went wrong.'
        // })
    }
    render() {
        return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>Join</h1>
                {this.state.error ? <p>{this.state.error}</p>: undefined}
                <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                    <input type="email" ref={this.emailRef} name="email" placeholder="Email"/>
                    <input type="password" ref={this.passwordRef} name="password" placeholder="Password"/>
                    <button className="button">Create Account</button>
                </form>
                <Link to="/">Have an account?</Link>
            </div>
        </div>
        );
    }
}

Signup.propTypes = {
    createUser: PropTypes.func.isRequired
}

export default createContainer (()=>{
    return{
        createUser: Accounts.createUser
    }
}, Signup);