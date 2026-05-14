import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Counter1 from './Counter1';
import Counter2 from './Counter2';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/Feather';
import { Provider } from 'react-redux';
import counterStore from './store/counterStore';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Provider store={counterStore}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Counter1"
            component={Counter1}
            options={{
              title: 'Counter 1',
              tabBarIcon: ({ color, focused }) => (
                <Icon name="1" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="Counter2"
            component={Counter2}
            options={{
              title: 'Counter 2',
              tabBarIcon: ({ color, focused }) => (
                <Icon name="2" color={color} size={20} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}