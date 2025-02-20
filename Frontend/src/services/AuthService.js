import axiosInstance from '../api/axios';

export const register = async (userData) => {
    try {
        const response = await axiosInstance.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error in register API:', error);
        // Backend'den gelen hata mesajını kontrol edin
        throw new Error(error.response?.data || 'Registration failed');
    }
};

export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error in login API:', error);
        throw new Error(error.response?.data || 'Login failed');
    }
};
