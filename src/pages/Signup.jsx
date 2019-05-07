import React, { Component } from 'react';
import LoginForm from "../components/LoginForm"
import { Redirect } from 'react-router'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn : false
    }
  }

  sendToParent = (response) => {
    this.props.getUser(response)
    this.setState(
      {loggedIn: true}
    )
  }

  render(){
    if (this.state.loggedIn) return <Redirect to="/" /> 
    return(
      <div id="signup-container">
        <LoginForm route="signup" sendUser={(user) => this.sendToParent(user)} />
			</div>
    )
  }
}

export default Signup;