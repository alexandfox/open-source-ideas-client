import axios from 'axios';
require("dotenv").config();

class AuthService {
  constructor() {
    let service = axios.create({
			baseURL: "http://localhost:8888/api",
      withCredentials: true
		});
    this.service = service;
  }

	signup = (username, name, password) => {
		return this.service.post('/signup', {username, name, password})
		.then(response => response.data)
	}
}

export default AuthService;