// src/navigation/TabNavigator.tsx

import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostScreen from './postScreen';
import AddPostScreen from './AddPost';

export type TabParamList = {
  Posts: undefined;
  AddPost: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={PostScreen} />

      <Tab.Screen name="AddPost" component={AddPostScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
