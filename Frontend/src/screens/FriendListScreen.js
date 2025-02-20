import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import { getFriends } from '../services/FriendRequestService';
import { useNavigation } from '@react-navigation/native';

const FriendListScreen = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        try {
            const data = await getFriends();
            setFriends(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch friends.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = (friendId, friendName) => {
        navigation.navigate('FriendMessaging', {
            friendUserId: friendId,
            friendName: friendName,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Friends</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={friends}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.friendItem}>
                            <Text style={styles.friendText}>{item.name || item.email}</Text>
                            <Button
                                title="Send Message"
                                onPress={() => handleSendMessage(item.id, item.name || item.email)}
                            />
                        </View>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>No friends yet.</Text>}
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
    friendItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    friendText: {
        fontSize: 16,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default FriendListScreen;
