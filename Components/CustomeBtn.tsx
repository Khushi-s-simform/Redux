import {
    View,
    Text,
    StyleSheet,
    StyleProp,
    ViewStyle,
    ActivityIndicator,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  
  interface CustomeBtnProps {
    title: string;
    callback(): void;
    style?: StyleProp<ViewStyle>;
    loading?: boolean;
  }
  
  export default function CustomeBtn({
    title,
    callback,
    style,
    loading,
  }: CustomeBtnProps) {
    return (
      <TouchableOpacity style={[styles.buttonStyle, style]} onPress={callback}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.btnText}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: '#0A43C4',
      padding: 10,
      borderRadius: 15,
    },
    btnText: { color: 'white', textAlign: 'center' },
  });