import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

import { Provider, useSelector } from 'react-redux';

import AuthScreen from './AuthScreen';

import CustomeBtn from '../../Components/CustomeBtn';

import { store, RootState } from '../store/store';

import { logout } from '../slice/authSlice';

import { useAppDispatch } from '../hook/hook';

import AddPostScreen from './AddPostScreen';

import PostScreen from './postscreen';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TabNav = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Tab.Navigator
      screenOptions={{
        animation: 'shift',

        headerRight: () => (
          <CustomeBtn title="Logout" callback={handleLogout} />
        ),
      }}
    >
      {/* POSTS SCREEN */}

      <Tab.Screen
        name="Posts"
        component={PostScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'list' : 'list-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* ADD POST SCREEN */}

      <Tab.Screen
        name="Add Post"
        component={AddPostScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const StackNav = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen
          name="HOME"
          component={TabNav}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="AUTH"
          component={AuthScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default function HomeScreen() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </Provider>
  );
}
