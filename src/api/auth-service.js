import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create();
    this.service = service;
  }

	signup = (username, name, password) => {
		return this.service.post('/signup', {username, name, password})
		.then(response => response.data)
	}
}

export default AuthService;