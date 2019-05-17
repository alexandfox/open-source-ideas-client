import axios from 'axios';
require("dotenv").config();

class AuthService {
  constructor() {
    let service = axios.create({
			baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true
		});
    this.service = service;
  }

	signup = (username, name, password) => {
		return this.service.post('/signup', {username, name, password})
		.then(response => response.data)
	}

	login = (username, password) => {
		return this.service.post('/login', {username, password})
		.then(response => response.data)
	}

	logout = () => {
  return this.service.post('/logout', {})
  .then(response => response.data)
}

	loggedin = () => {
		return this.service.get('/loggedin')
		.then(response => response.data)
	}	
}

export default AuthService;