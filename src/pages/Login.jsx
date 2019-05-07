import React, { Component } from 'react';
import LoginForm from "../components/LoginForm"

class Login extends Component {
  constructor(props){
    super(props);
  }

  sendToParent = (response) => {
    this.props.getUser(response)
  }

  render(){
    return(
      <div id="login-container">
        <LoginForm route="login" sendUser={(user) => this.sendToParent(user)}/>
			</div>
    )
  }
}

export default Login;