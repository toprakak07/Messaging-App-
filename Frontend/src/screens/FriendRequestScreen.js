import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import {
    sendFriendRequest,
    getPendingRequests,
    getAllUsers,
    acceptFriendRequest,
    rejectFriendRequest,
} from '../services/FriendRequestService';

const FriendRequestScreen = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [loadingRequests, setLoadingRequests] = useState(false);

    useEffect(() => {
        fetchAllUsers();
        fetchPendingRequests();
    }, []);

    const fetchAllUsers = async () => {
        setLoadingUsers(true);
        try {
            const users = await getAllUsers();
            setAllUsers(users);
        } catch (error) {
            console.error('Error fetching all users:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to fetch users.');
        } finally {
            setLoadingUsers(false);
        }
    };

    const fetchPendingRequests = async () => {
        setLoadingRequests(true);
        try {
            const requests = await getPendingRequests();
            setPendingRequests(requests);
        } catch (error) {
            console.error('Error fetching pending requests:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to fetch pending requests.');
        } finally {
            setLoadingRequests(false);
        }
    };

    const handleSendRequest = async (receiverId) => {
        try {
            await sendFriendRequest(receiverId);
            Alert.alert('Success', 'Friend request sent successfully!');
            fetchPendingRequests(); // Refresh pending requests
        } catch (error) {
            console.error('Error sending friend request:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to send friend request.');
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            await acceptFriendRequest(requestId);
            Alert.alert('Success', 'Friend request accepted!');
            fetchPendingRequests(); // Refresh pending requests
        } catch (error) {
            console.error('Error accepting request:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to accept friend request.');
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            await rejectFriendRequest(requestId);
            Alert.alert('Success', 'Friend request rejected!');
            fetchPendingRequests(); // Refresh pending requests
        } catch (error) {
            console.error('Error rejecting request:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to reject friend request.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Friend Requests</Text>

            {/* List all users */}
            <Text style={styles.subtitle}>All Users</Text>
            {loadingUsers ? (
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
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No users available.</Text>
                    }
                    style={styles.list}
                />
            )}

            {/* List pending requests */}
            <Text style={styles.subtitle}>Pending Requests</Text>
            {loadingRequests ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={pendingRequests}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.userItem}>
                            <Text>{`From: ${item.senderEmail}`}</Text>
                            <Button title="Accept" onPress={() => handleAcceptRequest(item.id)} />
                            <Button title="Reject" onPress={() => handleRejectRequest(item.id)} />
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No pending requests.</Text>
                    }
                    style={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    list: {
        flex: 1,
    },
});

export default FriendRequestScreen;
