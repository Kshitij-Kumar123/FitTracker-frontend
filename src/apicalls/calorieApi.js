import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const calorieApi = axios.create({
    baseURL: process.env.REACT_APP_CALORIE_BASE_URL,
});

const CalorieAxiosMiddleware = () => {
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    // Add middleware to intercept requests
    calorieApi.interceptors.request.use(
        async (config) => {
            // Add headers or perform other actions before the request is sent
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
        });

    calorieApi.interceptors.response.use((response) => {
        return response
    }, (error) => {
        // Rudimentary but works...
        console.log(error)
        if (error.response.status) {
            // switch (error.response.status) {
            //     case 403:
            //         navigate('/forbidden');
            //     case 401:
            //         navigate('/')
            //     default:
            //         navigate('/error')
            // }


        }

        return Promise.reject(error);
    });

    return calorieApi;
};

export default CalorieAxiosMiddleware;
