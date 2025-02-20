import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import FriendListScreen from '../screens/FriendListScreen';
import SendFriendRequestScreen from '../screens/SendFriendRequestScreen';
import WaitingRequestsScreen from '../screens/WaitinRequestsScreen';
import FriendMessagingScreen from '../screens/FriendMessagingScreen';
import GroupCreationScreen from '../screens/GroupCreationScreen';
import GroupListScreen from '../screens/GroupListScreen';
import GroupDetailScreen from '../screens/GroupDetailScreen';
import GroupMessagingScreen from '../screens/GroupMessagingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FriendList" component={FriendListScreen} options={{ headerShown: true }} />
            <Stack.Screen
                name="SendFriendRequest"
                component={SendFriendRequestScreen}
                options={{ headerShown: true, title: 'Send Friend Request' }}
            />
            <Stack.Screen
                name="WaitingRequests"
                component={WaitingRequestsScreen}
                options={{ headerShown: true, title: 'Waiting Requests' }}
            />
            <Stack.Screen name="FriendMessaging" component={FriendMessagingScreen} options={{ headerShown: true }} />
            <Stack.Screen name="GroupCreation" component={GroupCreationScreen} options={{ headerShown: true }} />
            <Stack.Screen name="GroupList" component={GroupListScreen} options={{ headerShown: true }} />
            <Stack.Screen name="GroupDetail" component={GroupDetailScreen} options={{ headerShown: true }} />
            <Stack.Screen name="GroupMessaging" component={GroupMessagingScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
);

export default AppNavigator;
