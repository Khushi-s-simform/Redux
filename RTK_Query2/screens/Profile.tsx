import React, { useRef } from 'react';
import {
  TextInput,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
  Alert,
  Keyboard,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ProfileScreen = () => {

    const nameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const phoneRef = useRef<TextInput>(null);
    const addressRef = useRef<TextInput>(null);
    const cityRef = useRef<TextInput>(null);
    const stateRef = useRef<TextInput>(null);
    const countryRef = useRef<TextInput>(null);
    const pincodeRef = useRef<TextInput>(null);
    const landmarkRef = useRef<TextInput>(null);
    const areaRef = useRef<TextInput>(null);
    

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={40}
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          placeholder="Name"
          style={styles.input}
                  ref={nameRef}
                  onSubmitEditing={() => emailRef?.current?.focus()}
          returnKeyType="next"
        />
        <TextInput
          placeholder="Email"
                  style={styles.input}
                  ref={emailRef}
                  onSubmitEditing={() => phoneRef?.current?.focus()}
          returnKeyType="next"
        />
        <TextInput
          placeholder="Phone"
                  style={styles.input}
                  ref={phoneRef}
                  onSubmitEditing={() => addressRef?.current?.focus()}
          returnKeyType="next"
        />
        <TextInput
          placeholder="Address"
                  style={styles.input}
                  ref={addressRef}
                  onSubmitEditing={() => cityRef?.current?.focus()}
          returnKeyType="next"
        />
        <TextInput
          placeholder="City"
                  style={styles.input}
                  ref={cityRef}
                  onSubmitEditing={() => stateRef?.current?.focus()}
          returnKeyType="next"
        />
        <TextInput
          placeholder="State"
                  style={styles.input}
                  ref={stateRef}
                  onSubmitEditing={() => countryRef?.current?.focus()}
          returnKeyType="next"
        />
        <TextInput
          placeholder="Country"
                  style={styles.input}
                  ref={countryRef}
                  onSubmitEditing={() => pincodeRef?.current?.focus()}
          returnKeyType="next"
        />
        <TextInput
          placeholder="Pincode"
                  style={styles.input}
                  ref={pincodeRef}
                  keyboardType='numeric'
                  onSubmitEditing={() => landmarkRef?.current?.focus()}
          returnKeyType="next"
        />
        <TextInput
          placeholder="Landmark"
                  style={styles.input}
                  ref={landmarkRef}
                  onSubmitEditing={() => areaRef?.current?.focus()}
          returnKeyType="next"
        />
        <TextInput
          placeholder="Area"
                  style={styles.input}
                  ref={areaRef}
                  onSubmitEditing={() => Keyboard.dismiss()}
          returnKeyType="done"
        />
        <Pressable
          style={styles.btn}
          onPress={() => Alert.alert('submitted !!')}
        >
          <Text style={styles.btntext}>Submit</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
  btn: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold',
  },
});
