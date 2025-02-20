import axiosInstance from '../api/axios';

// Mesaj gönderme
const sendMessage = async (senderId, receiverId, content) => {
    try {
        console.log('Sending message:', { senderId, receiverId, content }); // Debug log
        const response = await axiosInstance.post('/messages/send', {
            receiverId,
            content,
        });
        console.log('Message sent successfully:', response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error.response?.data || error.message);
        throw error;
    }
};

// Konuşma geçmişini alma
const getConversation = async (userId1, userId2) => {
    try {
        console.log('Fetching conversation for:', { userId1, userId2 }); // Debug log
        const response = await axiosInstance.get('/messages/conversation', {
            params: { friendId: userId2 }, // Backend friendId parametresini bekliyorsa
        });
        console.log('Conversation fetched successfully:', response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error('Error fetching conversation:', error.response?.data || error.message);
        throw error;
    }
};

export default { sendMessage, getConversation };
