import React, { Component } from 'react';
import AuthService from '..api/auth-service';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  render(){
    return(
      <div id="signup-container">
			</div>
    )
  }
}

export default Signup;