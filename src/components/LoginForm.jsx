import React, { Component } from 'react';
import AuthService from '../api/auth-service';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = { username: "", name: "", password: "" };
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
					// THIS SHOULD CHANGE later --> (based on where came from, send to ie. Home)
					this.setState({
							username: "", 
							name: "",
							password: "",
					});
					this.props.getUser(response)
			})
			.catch( error => console.log(error) )
		} else {
			this.service.login(username, password)
				// THIS SHOULD CHANGE later --> (based on where came from, send to ie. Home)
				.then( response => {
						this.setState({
								username: "", 
								name: "",
								password: "",
						});
						this.props.getUser(response)
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
			<form className="loginForm" onSubmit={this.handleFormSubmit}>
				<label>Email:</label>
				<input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

				{
					this.props.route === "signup" && 
					<div className="nameInput">
						<label>Username:</label>
						<input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)} />
					</div>
				}
				
				<label>Password:</label>
				<textarea name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
				
				{this.props.route === "signup" && <input type="submit" value="Signup" />}
				{this.props.route === "login" && <input type="submit" value="Login" />}
				
			</form>
		)
	}
}

export default LoginForm;