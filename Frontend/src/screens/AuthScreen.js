import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { login, register } from '../services/AuthService';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await register({ email, password, username });
            alert('Registration successful! You can now log in.');
            setIsRegistering(false); // Login ekranına dön
        } catch (error) {
            // Backend'den gelen hata mesajını göster
            setErrorMessage(error.message || 'Registration failed');
        }
    };


    const handleLogin = async () => {
        try {
            const data = await login({ email, password });
            if (data && data.token) {
                await AsyncStorage.setItem('token', data.token);
                setErrorMessage('');
                navigation.navigate('Home');
            } else {
                setErrorMessage('Login failed: Invalid token or server error');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Login failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isRegistering ? 'Register' : 'Login'}</Text>
            {isRegistering && (
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
            )}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title={isRegistering ? 'Register' : 'Login'}
                onPress={isRegistering ? handleRegister : handleLogin}
            />
            <Button
                title={isRegistering ? 'Switch to Login' : 'Switch to Register'}
                onPress={() => setIsRegistering(!isRegistering)}
                color="gray"
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    error: { color: 'red', marginTop: 10, textAlign: 'center' },
});

export default AuthScreen;
