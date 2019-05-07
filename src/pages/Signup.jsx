import React, { Component } from 'react';
import LoginForm from "../components/LoginForm"

class Signup extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="signup-container">
        <LoginForm route="signup" />
			</div>
    )
  }
}

export default Signup;