import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getPendingRequests, acceptFriendRequest, rejectFriendRequest } from '../services/FriendRequestService';

const WaitingRequestsScreen = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const fetchPendingRequests = async () => {
        setLoading(true);
        try {
            const requests = await getPendingRequests();
            console.log('Pending Requests:', requests); // Gelen verileri kontrol edin
            setPendingRequests(requests);
        } catch (error) {
            console.error('Error fetching pending requests:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to fetch pending requests.');
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            await acceptFriendRequest(requestId);
            Alert.alert('Success', 'Friend request accepted!');
            setPendingRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== requestId)
            ); // Listeyi güncelle
        } catch (error) {
            console.error('Error accepting friend request:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to accept friend request.');
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            await rejectFriendRequest(requestId);
            Alert.alert('Success', 'Friend request rejected!');
            setPendingRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== requestId)
            ); // Listeyi güncelle
        } catch (error) {
            console.error('Error rejecting friend request:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to reject friend request.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Waiting Requests</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={pendingRequests}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.userItem}>
                            <Text style={styles.requestText}>{`From: ${item.senderEmail}`}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.acceptButton}
                                    onPress={() => handleAcceptRequest(item.id)}
                                >
                                    <Text style={styles.buttonText}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.rejectButton}
                                    onPress={() => handleRejectRequest(item.id)}
                                >
                                    <Text style={styles.buttonText}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No pending requests.</Text>
                    }
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
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    requestText: {
        fontSize: 16,
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    acceptButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    rejectButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default WaitingRequestsScreen;
