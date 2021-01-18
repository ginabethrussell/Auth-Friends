import axios from 'axios';

export const loginRequest = (userCredentials) => {
    return axios.post('http://localhost:5000/api/login', userCredentials);
};
