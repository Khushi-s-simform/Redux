import React from 'react';

import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';

import { FetchPosts } from '../actions/postSlice';

const PostsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts,
  );

  return (
    <View style={styles.container}>
      <Button
        title="Fetch Posts"
        onPress={() => {
          dispatch(FetchPosts());
        }}
      />

      {loading && <ActivityIndicator size="large" />}

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>

            <Text>{item.post}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  error: {
    color: 'red',
    marginVertical: 10,
  },
});
