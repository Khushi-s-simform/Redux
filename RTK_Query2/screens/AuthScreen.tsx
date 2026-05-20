import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
  } from 'react-native';
  
  import React, { useState } from 'react';
  
  import { useLoginMutation, useRegisterMutation } from '../api/AuthAPi';
  import { useAppDispatch } from '../hook/hook';
  import { setToken } from '../slice/authSlice';
  
  export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
  
    const [username, setUsername] = useState('khushi');
    const [email, setEmail] = useState('khushi@gmail.com');
    const [password, setPassword] = useState('123456');
    const dispatch = useAppDispatch();
    const [login, { isLoading: loginLoading, error: loginError }] =
      useLoginMutation();
  
    const [register, { isLoading: registerLoading, error: registerError }] =
      useRegisterMutation();
  
    const loading = loginLoading || registerLoading;
  
    const handleLogin = async () => {
      try {
        const response = await login({
          email,
          password,
        }).unwrap();
  
        dispatch(setToken(response.data.accessToken));
  
          console.log('LOGIN SUCCESS', response);
          console.log(response.data.user._id);
          
      } catch (err) {
        console.log('LOGIN ERROR', err);
      }
    };
  
    const handleRegister = async () => {
      try {
        const response = await register({
          username,
          email,
          password,
        }).unwrap();
  
          console.log('REGISTER SUCCESS', response);
          console.log(response.data.user);
          
      } catch (err) {
        console.log('REGISTER ERROR', err);
      }
    };
  
    const apiError =
      (loginError as any)?.data?.message || (registerError as any)?.data?.message;
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
  
        {!isLogin && (
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        )}
  
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
  
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
  
        {!!apiError && <Text style={styles.error}>{apiError}</Text>}
  
        <TouchableOpacity
          style={styles.button}
          onPress={isLogin ? handleLogin : handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? 'Login' : 'Register'}
            </Text>
          )}
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => setIsLogin(prev => !prev)}>
          <Text style={styles.toggle}>
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
  
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
    },
  
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 14,
      borderRadius: 10,
      marginBottom: 15,
    },
  
    button: {
      backgroundColor: '#007bff',
      padding: 16,
      borderRadius: 10,
      alignItems: 'center',
    },
  
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  
    toggle: {
      textAlign: 'center',
      marginTop: 20,
      color: '#007bff',
    },
  
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 10,
    },
  });