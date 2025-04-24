import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoadCardScreen from '../screens/LoadCardScreen';
import DashboardScreen from '../screens/DashboardScreen';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: '#111', borderTopColor: '#222' },
      tabBarActiveTintColor: '#00FFAA',
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'LoadCard') iconName = 'card';
        else if (route.name === 'Dashboard') iconName = 'analytics';
        else iconName = 'home';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="LoadCard" component={LoadCardScreen} />
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Home" component={HomeScreen} />
  </Tab.Navigator>
);

export default BottomTabs;
