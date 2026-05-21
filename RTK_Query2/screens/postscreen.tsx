import React, { useState } from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import { useAppDispatch } from '../hook/hook';

import {
  useDeletePostMutation,
  useGetPostsQuery,
  useEditPostMutation,
  useLazyGetSinglePostQuery,
  postApi,
} from '../api/postAPi';

const PostScreen = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching } = useGetPostsQuery();

  //DELETE
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id).unwrap();

      Alert.alert('Success', 'Post deleted');
    } catch (error) {
      console.log(error);

      Alert.alert('Error', 'Delete failed');
    }
  };

  //EDIT

  const [editPost] = useEditPostMutation();

  const [getSinglePost, { isLoading: singlePostLoading }] =
    useLazyGetSinglePostQuery();

  const [modalVisible, setModalVisible] = useState(false);

  const [editContent, setEditContent] = useState('');

  const [selectedPostId, setSelectedPostId] = useState('');

  const handleEdit = async (id: string) => {
    try {
      // GET SINGLE POST
      const response = await getSinglePost(id).unwrap();

      setSelectedPostId(id);

      setEditContent(response.data.content);

      setModalVisible(true);
    } catch (error) {
      console.log(error);

      Alert.alert('Error', 'Failed to fetch post');
    }
  };

  const handleUpdatePost = async () => {
    try {
      // PATCH REQUEST
      const updatedPost = await editPost({
        id: selectedPostId,
        content: editContent,
      }).unwrap();

      // UPDATE ONLY MATCHING CARD
      dispatch(
        postApi.util.updateQueryData('getPosts', undefined, draft => {
          const index = draft.data.posts.findIndex(
            post => post._id === selectedPostId,
          );

          if (index !== -1) {
            draft.data.posts[index] = updatedPost.data;
          }
        }),
      );

      Alert.alert('Success', 'Post updated');

      setModalVisible(false);
    } catch (error) {
      console.log(error);

      Alert.alert('Error', 'Update failed');
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      {isFetching && <Text>Refreshing...</Text>}

      <FlatList
        data={data?.data.posts}
        keyExtractor={item => item._id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.user}>{item.author.account.username}</Text>

            <Text style={styles.content}>{item.content}</Text>

            {/* EDIT BUTTON */}

            <Pressable
              style={styles.editButton}
              onPress={() => handleEdit(item._id)}
            >
              <Text style={styles.editText}>Edit</Text>
            </Pressable>

            {/* DELETE BUTTON */}

            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDelete(item._id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {singlePostLoading && <ActivityIndicator size="small" />}

                <TextInput
                  value={editContent}
                  onChangeText={setEditContent}
                  style={styles.input}
                  multiline
                />

                {/* UPDATE BUTTON */}

                <Pressable
                  style={styles.updateButton}
                  onPress={handleUpdatePost}
                >
                  <Text style={styles.updateText}>Update</Text>
                </Pressable>

                {/* CANCEL BUTTON */}

                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  card: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    marginBottom: 12,
    borderWidth: 1,
  },

  user: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  content: {
    fontSize: 16,
  },

  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },

  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },

  editButton: {
    backgroundColor: 'green',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'flex-end',
  },

  editText: {
    color: 'white',
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },

  updateButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  updateText: {
    color: 'white',
    fontWeight: 'bold',
  },

  cancelButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  cancelText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
