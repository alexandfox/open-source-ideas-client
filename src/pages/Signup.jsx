import React, { Component } from 'react';
import ReactDOM from "react-dom";
import LoginForm from "../components/LoginForm"
import { Redirect } from 'react-router'
// import Modal from "../components/Modal"

const modalRoot = document.querySelector("#modal")

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn : false,
      route : "signup",
    }
  }

  sendToParent = (response) => {
    this.props.getUser(response)
    this.setState({
      loggedIn: true,
    })
  }

  div = document.createElement("div")
	componentDidMount() {
		modalRoot.appendChild(this.div)
		console.log("modal rendered")
	} 

	componentWillUnmount() {
		modalRoot.removeChild(this.div)
	}

  changeToLogin = () => {
    console.log("clicked span. ")
    this.setState({
      route : "login"
    })
  }

  changeToSignup = () => {
    console.log("clicked span. ")
    this.setState({
      route : "signup"
    })
  }

  render(){
    // if (this.state.loggedIn) return <Redirect to="/" /> 
		console.log("here's the state: ", this.state)
    return ReactDOM.createPortal(
			<div className="modal"
					// onClick={this.props.onClose}
				>
					<div className="modal-main">
            <span class="close" onClick={this.props.onClose}>&times;</span>
            <div className="modal-content">
              <div className="modalHeading">
                <h1 className="signupHeading">Welcome</h1>
                <h4 className="modalDescription">Create an account to follow your favorite idea-makers and topics. We're a community excited to share and discover new, interesting things.</h4>
              </div>

              { this.state.route === "signup" ?
                <LoginForm route="signup" closeModal={this.props.onClose} /> :
                <LoginForm route="login" closeModal={this.props.onClose} /> }

              { this.state.route === "signup" ?
                <div className="modalFootnote" >Already have an account?<span className="link" onClick={this.changeToLogin} value="login">Login</span></div> :
                <div className="modalFootnote">Don't have an account? <span className="link" onClick={this.changeToSignup} value="signup">Signup</span></div>
              }
            </div>
					</div>
				</div>
		, this.div);
	}
    
    
    // (
    //   <div id="signup-container">
    //     <LoginForm route="signup" sendUser={(user) => this.sendToParent(user)} />
		// 	</div>
    // )
}

export default Signup;