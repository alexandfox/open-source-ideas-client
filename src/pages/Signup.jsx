import React, { Component } from 'react';
import ReactDOM from "react-dom";
import LoginForm from "../components/LoginForm"
import { Redirect } from 'react-router'
import Login from "./Login"
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
    return ReactDOM.createPortal(
			<div
					style={{
						position: 'absolute',
						top: '0',
						bottom: '0',
						left: '0',
						right: '0',
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(0,0,0,0.3)',
					}}
					// onClick={this.props.onClose}
				>
					<div
						style={{
							padding: 20,
							background: '#fff',
							borderRadius: '2px',
							display: 'inline-block',
							minHeight: '300px',
							margin: '1rem',
							position: 'relative',
							minWidth: '300px',
							boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
							justifySelf: 'center',
						}}
					>
            { this.state.route === "signup" ?
              <LoginForm route="signup" closeModal={this.props.onClose} /> :
              <LoginForm route="login" closeModal={this.props.onClose} /> }

            { this.state.route === "signup" ?
              <p>already have an account?<button onClick={this.changeToSignup} value="login">Login</button></p> :
              <p>don't have an account? <button onClick={this.changeToLogin} value="signup">Signup</button></p>
            }

						<hr />
						<button onClick={this.props.onClose}>Close</button>
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