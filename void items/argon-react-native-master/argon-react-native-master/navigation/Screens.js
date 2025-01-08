import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Import your custom components and screens
import CustomDrawerContent from './Menu';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Elements from '../screens/Elements';
import Articles from '../screens/Articles';
import Pro from '../screens/Pro';
import Onboarding from '../screens/Onboarding';
import VideoSearchScreen from './VideoSearchScreen';  // Correct relative path
import { Header } from '../components';
import { Block } from 'galio-framework';

// Constants
const { width } = Dimensions.get('screen');

// Navigation components
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Define the different stacks
function ElementsStack(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Elements" component={Elements} />
      <Stack.Screen name="Pro" component={Pro} />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Articles" component={Articles} />
      <Stack.Screen name="Pro" component={Pro} />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Pro" component={Pro} />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pro" component={Pro} />
    </Stack.Navigator>
  );
}

// Main drawer navigation
function AppStack(props) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
      drawerStyle={{
        backgroundColor: 'white',
        width: width * 0.8,
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Account" component={Register} />
      <Drawer.Screen name="Elements" component={ElementsStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
      <Drawer.Screen name="VideoSearch" component={VideoSearchScreen} />
    </Drawer.Navigator>
  );
}

// Onboarding stack
export default function OnboardingStack(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
