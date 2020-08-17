import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-26b39.firebaseio.com/'
})

export default instance;