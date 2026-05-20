import React, { useState } from 'react';

import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';

import { useAddPostMutation } from './API/api';

const AddPostScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [addPost, { isLoading }] = useAddPostMutation();

  const handleAddPost = async () => {
    if (!title || !body) {
      Alert.alert('Validation', 'Please fill all fields');

      return;
    }

    try {
      await addPost({
        title,
        body,
        userId: 1,
      }).unwrap();
      console.log('added to api');

      Alert.alert('Success', 'Post Added');

      setTitle('');
      setBody('');
    } catch (error) {
      console.log(error);

      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter body"
        value={body}
        onChangeText={setBody}
        style={[styles.input, styles.bodyInput]}
        multiline
      />

      <Pressable style={styles.addButton} onPress={handleAddPost}>
        <Text style={styles.addText}>
          {isLoading ? 'Adding...' : 'Add Post'}
        </Text>
      </Pressable>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 12,
    borderRadius: 10,
  },

  bodyInput: {
    height: 120,
    textAlignVertical: 'top',
  },

  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  addText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
