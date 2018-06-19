import axios from 'axios';
import {Config} from './../config/Config';

var instance = axios.create({
    baseURL: Config.SERVER_PATH,
    timeout: 1000,
});

// Request interceptor
instance.interceptors.request.use(function (config) {
    // Request Data
    console.log('Request : ', config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error.response.data);
});

// Response interceptor
instance.interceptors.response.use(function (response) {
    // Response data
    console.log("Response : ", response);
    return response;
}, function (error) {
    // Response error
    return Promise.reject(error.response.data.error);
});


export default instance;