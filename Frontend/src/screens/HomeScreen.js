import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, Logged In User!</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="FRIEND LIST"
                    onPress={() => navigation.navigate('FriendList')}
                    color="#007BFF"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="SEND FRIEND REQUEST"
                    onPress={() => navigation.navigate('SendFriendRequest')}
                    color="#007BFF"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="WAITING REQUESTS"
                    onPress={() => navigation.navigate('WaitingRequests')}
                    color="#007BFF"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="FRIEND MESSAGING"
                    onPress={() => navigation.navigate('FriendMessaging')}
                    color="#007BFF"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="GROUP CREATION"
                    onPress={() => navigation.navigate('GroupCreation')}
                    color="#007BFF"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="SHOW GROUP LIST"
                    onPress={() => navigation.navigate('GroupList')}
                    color="#007BFF"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="SHOW GROUP DETAILS"
                    onPress={() => navigation.navigate('GroupDetail')}
                    color="#007BFF"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="GROUP MESSAGING"
                    onPress={() => navigation.navigate('GroupMessaging')}
                    color="#007BFF"
                />
            </View>
            <View style={styles.logoutButton}>
                <Button
                    title="LOGOUT"
                    onPress={() => navigation.navigate('Auth')}
                    color="#FF0000"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F8F8',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '80%',
        marginVertical: 10,
    },
    logoutButton: {
        width: '80%',
        marginVertical: 20,
    },
});

export default HomeScreen;
