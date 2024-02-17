import axios from 'axios';

export const apiCall = axios.create({
    baseURL: "/api"
})
