import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCount, decrementCount } from './actions/countActions';
//@ts-ignore
import Icon from 'react-native-vector-icons/dist/Feather';

const Counter1 = () => {
  const count = useSelector((state: any) => state.value);

  const dispatch = useDispatch();

  return (
    <View style={{ justifyContent: 'center', gap: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>count : {count}</Text>

      <View style={{ gap: 20 }}>
        {/* Increment by 1 */}
        <TouchableOpacity
          onPress={() => {
            console.log('Dispatch → INCREMENT by 1');
            dispatch(incrementCount()); // no payload → default +1
          }}
        >
          <Icon name="plus" size={20} style={styles.icon} />
        </TouchableOpacity>

        {/* Increment by 5 using payload */}
        <TouchableOpacity
          onPress={() => {
            console.log('Dispatch → INCREMENT by 5');
            dispatch(incrementCount(5)); // payload → +5
          }}
        >
          {/* UI showing +5 action */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={{ justifyContent: 'center', alignItems: 'center' }}>
              +5
            </Text>
            <Icon name="plus" size={20} style={styles.icon} />
          </View>
        </TouchableOpacity>

        {/* Decrement by 1 */}
        <TouchableOpacity
          onPress={() => {
            console.log('Dispatch → DECREMENT');
            dispatch(decrementCount());
          }}
        >
          <Icon name="minus" size={20} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default Counter1;
