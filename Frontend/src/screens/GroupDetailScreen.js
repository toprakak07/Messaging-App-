import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axiosInstance from '../api/axios';

const GroupDetailsScreen = ({ route }) => {
    const { groupId } = route.params;
    const [groupDetails, setGroupDetails] = useState(null);

    const fetchGroupDetails = async () => {
        try {
            const response = await axiosInstance.get(`/groups/${groupId}`);
            setGroupDetails(response.data);
        } catch (error) {
            console.error('Error fetching group details:', error);
        }
    };

    useEffect(() => {
        fetchGroupDetails();
    }, []);

    if (!groupDetails) {
        return <Text>Loading group details...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{groupDetails.name}</Text>
            <Text>Created At: {groupDetails.createdAt}</Text>
            <Text>Members:</Text>
            {groupDetails.members.map((member) => (
                <Text key={member.id}>{member.name}</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, marginBottom: 20 },
});

export default GroupDetailsScreen;
