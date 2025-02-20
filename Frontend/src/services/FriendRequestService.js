import axiosInstance from '../api/axios';

// Get all users except the current user
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/friends/all-users');
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error.response?.data || error.message);
        throw error;
    }
};

// Send a friend request
export const sendFriendRequest = async (receiverEmail) => {
    try {
        const response = await axiosInstance.post('/friends/send', { receiverId: receiverEmail });
        return response.data;
    } catch (error) {
        console.error('Error sending friend request:', error.response?.data || error.message);
        throw error;
    }
};


// Get all pending friend requests
export const getPendingRequests = async () => {
    try {
        const response = await axiosInstance.get('/friends/pending');
        return response.data;
    } catch (error) {
        console.error('Error fetching pending requests:', error.response?.data || error.message);
        throw error;
    }
};

// Accept a friend request
export const acceptFriendRequest = async (requestId) => {
    try {
        const response = await axiosInstance.post('/friends/accept', { requestId });
        return response.data;
    } catch (error) {
        console.error('Error accepting friend request:', error.response?.data || error.message);
        throw error;
    }
};

// Reject a friend request
export const rejectFriendRequest = async (requestId) => {
    try {
        const response = await axiosInstance.post('/friends/reject', { requestId });
        return response.data;
    } catch (error) {
        console.error('Error rejecting friend request:', error.response?.data || error.message);
        throw error;
    }
};

// Get user's friends
export const getFriends = async () => {
    try {
        const response = await axiosInstance.get('/friends/friends');
        return response.data;
    } catch (error) {
        console.error('Error fetching friends:', error.response?.data || error.message);
        throw error;
    }
};
