import React, { Component } from 'react';
import LoginForm from "../components/LoginForm"
import { Redirect } from 'react-router'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      showHide : props.show ? "modal display-block" : "modal display-none"
    }
  }

	componentDidUpdate(prevProps, prevState) {
    if (this.props.show !== prevProps.show) {
      this.setState({
				showHide : this.props.show ? "modal display-block" : "modal display-none"
			})
    }
  }

  render(){
    return(
      <div className={this.state.showHide}>
				<section className="modal-main">
					Hello! I am a modal
					<button onClick={this.props.handleClose}>close</button>
				</section>
			</div>
    )
  }
}

export default Signup;