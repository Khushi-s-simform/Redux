import React from 'react';

import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ListRenderItem,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from './store/store';

import { fetchPosts } from './slice/postSlice';

// TYPES

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
// COMPONENT

const PostsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { posts, loading } = useSelector(
    (state: RootState) => state.post,
  );

  // TYPED RENDER ITEM

  const renderItem: ListRenderItem<Post> = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>

        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="Fetch Posts (RTK Example)"
        onPress={() => {
          dispatch(fetchPosts());
        }}
      />

      {loading && <ActivityIndicator size="large" style={styles.loader} />}


      <FlatList<Post>
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default PostsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  loader: {
    marginVertical: 20,
  },

  listContainer: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  error: {
    color: 'red',
    marginVertical: 10,
    fontSize: 16,
  },
});
