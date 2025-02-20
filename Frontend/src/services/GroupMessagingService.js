import axiosInstance from '../api/axios';

export const getGroupMessages = async (groupId) => {
    try {
        const response = await axiosInstance.get(`/group-messages/${groupId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching group messages:', error);
        throw error;
    }
};

export const sendGroupMessage = async (message) => {
    try {
        const response = await axiosInstance.post('/group-messages/send', message);
        return response.data;
    } catch (error) {
        console.error('Error sending group message:', error);
        throw error;
    }
};
