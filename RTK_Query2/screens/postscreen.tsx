import React from 'react'

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native'

import {
  useDeletePostMutation,
  useGetPostsQuery,
} from '../api/postAPi'

const PostScreen = () => {
  const {
    data,
    isLoading,
    isFetching,
  } = useGetPostsQuery()

  const [deletePost] =
    useDeletePostMutation()

  const handleDelete = async (
    id: string,
  ) => {
    try {
      await deletePost(id).unwrap()

      Alert.alert(
        'Success',
        'Post deleted',
      )
    } catch (error) {
      console.log(error)

      Alert.alert(
        'Error',
        'Delete failed',
      )
    }
  }

  if (isLoading) {
    return (
      <ActivityIndicator size="large" />
    )
  }

  return (
    <View style={styles.container}>
      {isFetching && (
        <Text>Refreshing...</Text>
      )}

<FlatList
  data={data?.data.posts}
  keyExtractor={item => item._id}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text style={styles.user}>
        {
          item.author.account
            .username
        }
      </Text>

      <Text style={styles.content}>
        {item.content}
      </Text>

      <Pressable
        style={styles.deleteButton}
        onPress={() =>
          handleDelete(item._id)
        }>
        <Text
          style={styles.deleteText}>
          Delete
        </Text>
      </Pressable>
    </View>
  )}
/>
    </View>
  )
}

export default PostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  card: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
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
})