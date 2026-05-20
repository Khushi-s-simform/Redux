import React, { useState } from 'react'

import {
  View,
  TextInput,
  Alert,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native'

import { useAddPostMutation } from '../api/postAPi'

const AddPostScreen = () => {
  const [content, setContent] =
    useState('')

  const [
    addPost,
    { isLoading },
  ] = useAddPostMutation()

  const handleAddPost = async () => {
    if (!content) {
      Alert.alert(
        'Validation',
        'Enter content',
      )
  
      return
    }
  
    try {
      const formData = new FormData()
  
      formData.append(
        'content',
        content,
      )
  
      await addPost(
        formData,
      ).unwrap()
  
      Alert.alert(
        'Success',
        'Post Added',
      )
  
      setContent('')
    } catch (error) {
      console.log(error)
  
      Alert.alert(
        'Error',
        'Post creation failed',
      )
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter post content"
        value={content}
        onChangeText={setContent}
        style={styles.input}
        multiline
      />

      <Pressable
        style={styles.button}
        onPress={handleAddPost}>
        <Text style={styles.buttonText}>
          {isLoading
            ? 'Adding...'
            : 'Add Post'}
        </Text>
      </Pressable>
    </View>
  )
}

export default AddPostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },

  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})