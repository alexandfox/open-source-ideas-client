import React, { Component } from 'react';
import LoginForm from "../components/LoginForm"
import { Redirect } from 'react-router'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn : false,
      loggedUser : null
    }
  }

  sendToParent = (response) => {
    this.props.getUser(response)
    // console.log(response);
    this.setState(
      {loggedIn: true,
      loggedUser: response}
    )
  }

  render(){
    if (this.state.loggedIn) return <Redirect to="/" loggedUser={this.state.loggedUser} /> 
    return(
      <div id="login-container">
        <LoginForm route="login" sendUser={(user) => this.sendToParent(user)}/>
			</div>
    )
  }
}

export default Login;