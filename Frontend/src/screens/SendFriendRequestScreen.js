import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getAllUsers, sendFriendRequest } from '../services/FriendRequestService';

const SendFriendRequestScreen = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const users = await getAllUsers();
            setAllUsers(users);
        } catch (error) {
            console.error('Error fetching all users:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendRequest = async (receiverId) => {
        try {
            await sendFriendRequest(receiverId);
            Alert.alert('Success', 'Friend request sent successfully!');
        } catch (error) {
            console.error('Error sending friend request:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to send friend request.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Send Friend Request</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={allUsers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.userItem}>
                            <Text>{item.email}</Text>
                            <Button
                                title="Send Request"
                                onPress={() => handleSendRequest(item.id)}
                            />
                        </View>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>No users available.</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    userItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
    emptyText: { fontSize: 16, color: '#999', textAlign: 'center', marginTop: 20 },
});

export default SendFriendRequestScreen;
