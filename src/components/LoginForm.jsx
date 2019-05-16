import React, { Component } from 'react';
import AuthService from '../api/auth-service';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = { 
			username: "", 
			name: "", 
			password: "",
		};
		this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
		event.preventDefault();
		const username = this.state.username;
		const name = this.state.name;
		const password = this.state.password;

		if (this.props.route === "signup") {
			this.service.signup(username, name, password)
			.then( response => {
				this.props.closeModal()
				// this.props.sendUser(response)
			})
			.catch( error => console.log(error) )
		} else {
			this.service.login(username, password)
				.then( response => {
					this.props.closeModal()
					// this.props.sendUser(response)
				})
				.catch( error => console.log(error) )
		}
	}

	handleChange = (event) => {  
		const {name, value} = event.target;
		this.setState({[name]: value});
	}
			
	render(){
		return(
			<div className="loginContainer">
				<form className="form loginForm" onSubmit={this.handleFormSubmit}>
					<input className="textInput short" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)} placeholder="email" />

					{
						this.props.route === "signup" && 
						<input className="textInput short" type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)} placeholder="username" />
					}
					
					<input className="textInput short" type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} placeholder="password" />
					
					{this.props.route === "signup" && <input className="button primary" type="submit" value="Signup" />}
					{this.props.route === "login" && <input className="button primary" type="submit" value="Login" />}
					
				</form>
			</div>
		)
	}
}

export default LoginForm;