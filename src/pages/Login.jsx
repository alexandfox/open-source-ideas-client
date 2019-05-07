import React, { Component } from 'react';
import LoginForm from "../components/LoginForm"

class Login extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="login-container">
        <LoginForm route="login" />
			</div>
    )
  }
}

export default Login;