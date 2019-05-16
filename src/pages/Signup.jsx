import React, { Component } from 'react';
import LoginForm from "../components/LoginForm"
import { Redirect } from 'react-router'
import TestModal from "../components/test-modal"
// import { ModalLink, Modal } from 'react-router-modal';
import Login from "./Login"
import Modal from "../components/Modal"

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
      show: false,
    })
  }

  showModal = () => {
    this.setState({ show: true });
    console.log("clicked")
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render(){
    if (this.state.loggedIn) return <Redirect to="/" /> 
    return(
      <div id="signup-container">
        {/* <LoginForm route="signup" sendUser={(user) => this.sendToParent(user)} /> */}
        {/* <Modal
          content="Hello!!!!!!"   
          header="Delete this?"                
          // actions={this.hi}
          onDismiss={this.hideModal}
        /> */}
        {/* <TestModal show={this.state.show} handleClose={this.hideModal} />
        <button type="button" onClick={this.showModal}>
          open modal
        </button> */}

        {/* <ModalLink path='/login' component={Login}>
          login test route
        </ModalLink> */}
{/* 
        <Modal component={Login}>
          login component test
        </Modal> */}

			</div>
    )
  }
}

export default Signup;