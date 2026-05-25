import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import React, { forwardRef } from 'react';

const CustomeInput = forwardRef<TextInput, TextInputProps>((props, ref) => {
  return (
    <TextInput {...props} ref={ref} style={[styles.textInput, props.style]} />
  );
});

export default CustomeInput;

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000', // fixed typo also
    borderRadius: 15,
    marginVertical: 10,
  },
});
