import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axiosInstance from '../api/axios';

const GroupListScreen = ({ navigation }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGroups = async () => {
        try {
            const response = await axiosInstance.get('/groups/my-groups');
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
            Alert.alert('Error', 'Failed to fetch groups. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleSendMessage = (groupId) => {
        navigation.navigate('GroupMessaging', { groupId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Groups</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={groups}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.groupItem}>
                            <Text style={styles.groupName}>{item.name}</Text>
                            <Text style={styles.membersHeader}>Members:</Text>
                            {item.members.map((member, index) => (
                                <Text key={index} style={styles.member}>
                                    {member}
                                </Text>
                            ))}
                            <Button
                                title="Send Message"
                                onPress={() => handleSendMessage(item.id)}
                                color="#007bff"
                            />
                        </View>
                    )}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
    groupItem: {
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    groupName: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    membersHeader: { fontSize: 16, marginTop: 10, fontWeight: 'bold' },
    member: { fontSize: 14, marginLeft: 10 },
    list: { paddingBottom: 20 },
});

export default GroupListScreen;
