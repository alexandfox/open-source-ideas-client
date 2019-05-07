import React, { Component } from 'react';
import LoginForm from "../components/LoginForm"

class Signup extends Component {
  constructor(props){
    super(props);
  }

  sendToParent = (response) => {
    this.props.getUser(response)
  }

  render(){
    return(
      <div id="signup-container">
        <LoginForm route="signup" sendUser={(user) => this.sendToParent(user)} />
			</div>
    )
  }
}

export default Signup;