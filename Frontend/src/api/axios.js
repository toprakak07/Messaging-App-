import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Backend base URL
    timeout: 10000, // Maksimum istek süresi
});

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('token'); // Token alınıyor
            if (token) {
                config.headers.Authorization = `Bearer ${token}`; // Header'a Authorization ekleniyor
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('Response Error:', error.response.data);
        } else {
            console.error('Network/Server Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
