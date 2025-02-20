import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList } from 'react-native';
import { createGroup } from '../services/GroupService';

const GroupCreationScreen = () => {
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState('');

    const handleAddMember = () => {
        if (newMember.trim()) {
            setMembers((prevMembers) => [...prevMembers, newMember.trim()]);
            setNewMember('');
        } else {
            Alert.alert('Error', 'Member email cannot be empty.');
        }
    };

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            Alert.alert('Error', 'Group name cannot be empty.');
            return;
        }
        if (members.length === 0) {
            Alert.alert('Error', 'Group must have at least one member.');
            return;
        }

        try {
            const group = await createGroup(groupName, members);
            Alert.alert('Success', `Group "${group.name}" created successfully!`);
            setGroupName('');
            setMembers([]);
        } catch (error) {
            Alert.alert('Error', 'Failed to create group.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create a New Group</Text>
            <TextInput
                style={styles.input}
                placeholder="Group Name"
                value={groupName}
                onChangeText={setGroupName}
            />
            <TextInput
                style={styles.input}
                placeholder="Add Member Email"
                value={newMember}
                onChangeText={setNewMember}
            />
            <Button title="Add Member" onPress={handleAddMember} />
            <FlatList
                data={members}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.member}>{item}</Text>}
            />
            <Button title="Create Group" onPress={handleCreateGroup} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
    member: { padding: 5, fontSize: 16, backgroundColor: '#f0f0f0', marginBottom: 5, borderRadius: 5 },
});

export default GroupCreationScreen;
