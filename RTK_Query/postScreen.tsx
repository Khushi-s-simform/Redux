import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { useGetPostsQuery } from './API/api';

const PostScreen = () => {
  const { data, error, isLoading, isFetching } = useGetPostsQuery();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <View style={styles.container}>
      {isFetching && <Text>Refreshing...</Text>}

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
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

  card: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
