import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
  } from 'react-native';
  import React, { useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { loginUser, registerUser } from '../actions/AuthAction';
import { RootState } from '../store/store';
  
  export default function AuthScreen() {
    const dispatch = useDispatch<any>();
  
    const { loading, error, success } = useSelector(
      (state: RootState) => state.auth
    );
  
    const [isLogin, setIsLogin] = useState(true);
  
    const [username, setUsername] = useState('khushi');
    const [email, setEmail] = useState('khushi@gmail.com');
    const [password, setPassword] = useState('khushi123');
  
    const handleLogin = () => {
      dispatch(loginUser(email, password));
    };
  
    const handleRegister = () => {
      dispatch(
        registerUser({
          username,
          email,
          password,
        })
      );
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {isLogin ? 'Login' : 'Register'}
        </Text>
  
        {!isLogin && (
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize='none'
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
  
        {/* Error */}
        {error && <Text style={styles.error}>{error}</Text>}
  
        {/* Success */}
        {success && <Text style={styles.success}>{success}</Text>}
  
        {/*  Button */}
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
  
        {/*  Toggle */}
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
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
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 25,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      borderRadius: 10,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
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
    success: {
      color: 'green',
      textAlign: 'center',
      marginBottom: 10,
    },
  });