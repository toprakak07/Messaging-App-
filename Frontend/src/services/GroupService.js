import axiosInstance from '../api/axios';

/**
 * Grup oluşturma
 * @param {string} name - Grup adı
 * @param {Array<string>} members - Üye email listesi
 * @returns {Object} - Oluşturulan grup bilgisi
 */
export const createGroup = async (name, members) => {
    try {
        const response = await axiosInstance.post('/groups/create', { name, members });
        return response.data;
    } catch (error) {
        console.error('Error creating group:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to create group.');
    }
};

/**
 * Tüm grupları listeleme
 * @returns {Array<Object>} - Tüm grupların listesi
 */
export const getAllGroups = async () => {
    try {
        const response = await axiosInstance.get('/groups/list');
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch groups.');
    }
};

/**
 * Bir gruba üye ekleme
 * @param {string} groupId - Grup ID'si
 * @param {string} userId - Kullanıcı ID'si
 * @returns {Object} - Güncellenmiş grup bilgisi
 */
export const addMemberToGroup = async (groupId, userId) => {
    try {
        const response = await axiosInstance.post(`/groups/${groupId}/add-member`, { userId });
        return response.data;
    } catch (error) {
        console.error('Error adding member to group:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to add member to group.');
    }
};

/**
 * Kullanıcının dahil olduğu grupları getirme
 * @returns {Array<Object>} - Kullanıcının dahil olduğu gruplar
 */
export const getUserGroups = async () => {
    try {
        const response = await axiosInstance.get('/groups/my-groups');
        return response.data;
    } catch (error) {
        console.error('Error fetching user groups:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch user groups.');
    }
};
