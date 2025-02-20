import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MessageService from '../services/FriendMessagingService';
import { useRoute } from '@react-navigation/native';

const FriendMessagingScreen = () => {
    const route = useRoute();
    const { friendUserId, friendName, currentUserId } = route.params;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchMessages = async () => {
            try {
                const conversation = await MessageService.getConversation(currentUserId, friendUserId);
                if (isMounted) {
                    setMessages(conversation);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching conversation:', error);
                    Alert.alert('Error', 'Failed to load messages.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchMessages();

        return () => {
            isMounted = false;
        };
    }, [currentUserId, friendUserId]);

    const sendMessage = async () => {
        if (newMessage.trim() === '') {
            Alert.alert('Error', 'Message cannot be empty.');
            return;
        }

        try {
            const message = await MessageService.sendMessage(currentUserId, friendUserId, newMessage);
            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Error', 'Failed to send message.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chat with {friendName}</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                styles.messageContainer,
                                item.senderId === currentUserId
                                    ? styles.myMessageContainer
                                    : styles.theirMessageContainer,
                            ]}
                        >
                            <Text style={styles.messageText}>{item.content}</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.messageList}
                />
            )}
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
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    messageList: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    myMessageContainer: {
        backgroundColor: '#d1f8ff',
        alignSelf: 'flex-end',
    },
    theirMessageContainer: {
        backgroundColor: '#f1f1f1',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});

export default FriendMessagingScreen;
