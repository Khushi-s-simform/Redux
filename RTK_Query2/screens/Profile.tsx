import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput placeholder="Name" style={styles.input} />
          <TextInput placeholder="Email" style={styles.input} />
          <TextInput placeholder="Phone" style={styles.input} />
          <TextInput placeholder="Address" style={styles.input} />
          <TextInput placeholder="City" style={styles.input} />
          <TextInput placeholder="State" style={styles.input} />
          <TextInput placeholder="Country" style={styles.input} />
          <TextInput placeholder="Pincode" style={styles.input} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },

  input: {
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
