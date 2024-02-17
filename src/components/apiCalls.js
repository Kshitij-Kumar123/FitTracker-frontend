import axios from 'axios';

const apiCall = axios.create({
    baseURL: "http://172.212.68.81/api/"
})

export async function sampleApiCall() {
    apiCall.get("/").then(response => { return response; }).catch(error => { return error; });
}