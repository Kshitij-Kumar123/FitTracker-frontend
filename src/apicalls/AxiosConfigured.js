import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const useAxiosConfigured = (apiEndpoint) => {
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: apiEndpoint,
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            try {
                const accessToken = await getAccessTokenSilently();
                config.headers.Authorization = `Bearer ${accessToken}`;
            } catch (error) {
                console.error('Error getting access token:', error);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.error('Error response:', error);
            // if (error.response.status === 403) {
            //     navigate('/forbidden');
            // } else if (error.response.status === 401) {
            //     navigate('/');
            // } else {
            //     navigate('/error');
            // }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxiosConfigured;
