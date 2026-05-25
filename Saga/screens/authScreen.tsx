import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { loginRequest, registerRequest } from '../Redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../hook/hook';

export default function AuthScreen() {
  const dispatch = useAppDispatch();

  const { loading, error, success } = useAppSelector((state => state.auth));
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('khushi');
  const [email, setEmail] = useState('khushi@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = () => {
    dispatch(
      loginRequest({
        email,
        password,
      }),
    );
  };

  const handleRegister = () => {
    dispatch(
      registerRequest({
        username,
        email,
        password,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>

      {!isLogin && (
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
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

      {!!error && <Text style={styles.error}>{error}</Text>}

      {!!success && <Text style={styles.success}>{success}</Text>}

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
