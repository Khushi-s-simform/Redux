import React from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from 'react-native';

import { useDeletePostMutation, useGetPostsQuery } from './API/api';

const PostScreen = () => {
  const { data, isLoading, isFetching } = useGetPostsQuery();

  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (id: number) => {
    try {
        await deletePost(id).unwrap();
        console.log("post deleted");
        
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFetching && <Text style={styles.refreshing}>Refreshing...</Text>}

      <FlatList
        data={data?.posts}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.body}>{item.body}</Text>

            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  refreshing: {
    marginBottom: 10,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#eaeaea',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  body: {
    fontSize: 14,
  },

  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
    backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },

  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
