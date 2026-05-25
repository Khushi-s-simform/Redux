import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import AuthScreen from './authScreen';
import TodoScreen from './TodoScreen';
import { store } from '../store/store';
import { useAppDispatch, useAppSelector } from '../hook/hook';
import { logout } from '../Redux/auth/authSlice';

type RootStackParamList = {
  TODO: undefined;
  AUTH: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const LogoutBtn = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
};
const StackNav = () => {
  const { accessToken } = useAppSelector(state => state.auth);

  console.log('ACCESS TOKEN =>', accessToken);

  return (
    <Stack.Navigator>
      {accessToken ? (
        <Stack.Screen
          name="TODO"
          component={TodoScreen}
          options={{
            title: 'Todo',
            headerRight: () => <LogoutBtn />,
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

export default function SagaLayout() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
