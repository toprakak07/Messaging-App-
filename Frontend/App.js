import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            setIsLoggedIn(!!token);
        } catch (error) {
            console.error('Error verifying login status:', error);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    if (isLoggedIn === null) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
