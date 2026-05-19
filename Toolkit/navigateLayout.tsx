import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native';
import { RootState, AppDispatch } from './store/store';
import AuthScreen from './AuthScreen';
import PostsScreen from './PostScreen';
import { logOut } from './slice/authSlice';

// STACK

const Stack = createNativeStackNavigator();

// LOGOUT BUTTON COMPONENT

const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Button
      title="Logout"
      onPress={() => {
        dispatch(logOut());
      }}
    />
  );
};

// APP NAVIGATOR

const AppNavigator = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{
              title: 'Login',
            }}
          />
        ) : (
          <Stack.Screen
            name="Posts"
            component={PostsScreen}
            options={{
              title: 'Posts',

              headerRight: LogoutButton,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
