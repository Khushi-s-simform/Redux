import React, { useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomeBtn from '../../Components/CustomeBtn';
import CustomeInput from '../../Components/CustomInput';
import { useAppDispatch, useAppSelector } from '../hook/hook';
import {
  getTodoRequested,
  postTodoRequested,
  searchTodoRequested,
  todo,
} from '../Redux/todo/todoSlice';

export default function TodoScreen() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const dispatch = useAppDispatch();
  const { loading, success, error, todos } = useAppSelector(
    state => state.todo,
  );

  const handleSubmit = (): void => {
    if (!title.trim()) {
      return;
    }
    if (!description.trim()) {
      return;
    }
    dispatch(
      postTodoRequested({
        title,
        description,
      }),
    );

    setTitle('');
    setDescription('');
    handleRefresh();
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    dispatch(searchTodoRequested(text));
  };

  const handleRefresh = (): void => {
    dispatch(getTodoRequested());
  };
  const renderTodo: ListRenderItem<todo> = ({ item }) => {
    return (
      <View style={styles.todoCard}>
        <View style={styles.todoHeader}>
          <Text style={styles.todoTitle}>{item.title}</Text>

          <View
            style={[
              styles.badge,
              item.isCompleted ? styles.completedBadge : styles.pendingBadge,
            ]}
          >
            <Text style={styles.badgeText}>
              {item.isCompleted ? 'Done' : 'Pending'}
            </Text>
          </View>
        </View>

        <Text style={styles.todoDescription}>{item.description}</Text>
        {/* <Button
              title="Mark as completed"
              onPress={() => {
                item.isCompleted ? 'false' : 'true';
                handleRefresh();
                console.log(item.isCompleted);
              }}
            /> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>My Todos</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.refreshBtn}
          onPress={handleRefresh}
        >
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.formCard}>
        <CustomeInput
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />

        <CustomeInput
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />

        <CustomeBtn title="Add Todo" callback={handleSubmit} />
      </View>

      {/* Success */}
      {success ? <Text style={styles.success}>{success}</Text> : null}

      {/* Error */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CustomeInput
        placeholder="Search"
        value={search}
        onChangeText={handleSearch}
      />
      {/* Todo List */}
      <FlatList
        data={todos}
        keyExtractor={item => item._id}
        renderItem={renderTodo}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Todos Found</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },

  refreshBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },

  refreshText: {
    color: '#ffffff',
    fontWeight: '600',
  },

  formCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  listContainer: {
    paddingBottom: 30,
  },

  todoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 2,
  },

  todoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  todoTitle: {
    flex: 1,
    marginRight: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  todoDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#6b7280',
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  completedBadge: {
    backgroundColor: '#22c55e',
  },

  pendingBadge: {
    backgroundColor: '#f59e0b',
  },

  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },

  success: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#16a34a',
    fontWeight: '600',
  },

  error: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#dc2626',
    fontWeight: '600',
  },

  emptyContainer: {
    marginTop: 80,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
  },
});
