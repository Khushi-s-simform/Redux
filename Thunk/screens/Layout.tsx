import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Provider, useDispatch, useSelector } from 'react-redux';
import HomeScreen from './postScreen';
import ProfileScreen from './ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './AuthScreen';
import { AppDispatch, RootState, store } from '../store/store';
import { loadUser, logoutUser } from '../actions/AuthAction';
import CustomeBtn from '../../Components/CustomeBtn';

const Tab = createBottomTabNavigator();

type ThunkParamList = {
  HOME: undefined;
  AUTH: undefined;
};

const Stack = createNativeStackNavigator<ThunkParamList>();
const TabNav = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => {
          return (
            <CustomeBtn
              title="Logout"
              callback={() => {
                dispatch(logoutUser());
              }}
            />
          );
        },
        animation: 'shift',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNav = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'flip',
      }}
    >
      {token ? (
        <Stack.Screen
          name="HOME"
          component={TabNav}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="AUTH"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default function ThunkLayout() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </Provider>
  );
}
