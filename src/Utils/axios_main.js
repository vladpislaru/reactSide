import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_SERVERURL ? process.env.REACT_APP_SERVERURL :'http://localhost:1337',
    
})