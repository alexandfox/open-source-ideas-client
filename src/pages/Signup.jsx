import React, { Component } from 'react';
import ReactDOM from "react-dom";
import LoginForm from "../components/LoginForm"
import { Redirect } from 'react-router'
// import Login from "./Login"
// import Modal from "../components/Modal"

const modalRoot = document.querySelector("#modal")

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn : false
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

  render(){
    if (this.state.loggedIn) return <Redirect to="/" /> 
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
            <LoginForm route="signup" sendUser={(user) => this.sendToParent(user)} />
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