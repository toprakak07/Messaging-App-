import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import axiosInstance from '../api/axios';

const GroupMessagingScreen = ({ route }) => {
    const { groupId } = route.params; // groupId parametresini al
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Grup mesajlarını sunucudan getir
    const fetchMessages = async () => {
        try {
            const response = await axiosInstance.get(`/groups/${groupId}/messages`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to fetch messages. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Mesaj gönder
    const sendMessage = async () => {
        if (newMessage.trim() === '') {
            Alert.alert('Error', 'Message cannot be empty.');
            return;
        }

        try {
            const response = await axiosInstance.post(`/groups/${groupId}/send-message`, {
                senderId: 'currentUserId', // Kullanıcının ID'sini buraya ekle
                content: newMessage,
            });

            // Yeni mesajı mesaj listesine ekle
            setMessages((prevMessages) => [...prevMessages, response.data]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to send message.');
        }
    };

    useEffect(() => {
        fetchMessages(); // Mesajları getir
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Group Chat</Text>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.message}>
                        <Text>{item.content}</Text>
                        <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
                    </View>
                )}
                contentContainerStyle={styles.messageList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    messageList: { flexGrow: 1, justifyContent: 'flex-end' },
    message: {
        backgroundColor: '#e1f5fe',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    timestamp: { fontSize: 12, color: '#777', marginTop: 5 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    input: { flex: 1, borderWidth: 1, padding: 10, borderRadius: 5, marginRight: 10, borderColor: '#ddd' },
});

export default GroupMessagingScreen;
