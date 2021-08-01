/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import HabitColorPickerFormItem from './HabitColorPickerFormItem';
import HabitDatePickerFormItem from './HabitDatePickerFormItem';
import HabitTypePickerFormIitem from './HabitTypePickerFormIitem';

export default function AddHabitScreen() {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        paddingTop: 45,
        paddingHorizontal: 16,
        paddingBottom: 32,
      }}>
      <View style={{marginBottom: 'auto'}}>
        <View>
          <Text style={styles.titleText}>Habit you want to form?</Text>
          <HabitColorPickerFormItem style={{marginTop: 19}} />
          <View style={{marginTop: 19}}>
            <TextInput placeholder="Habit Name" />
          </View>
          <Text style={[styles.titleText, {marginTop: 19}]}>
            Types of habit
          </Text>
          <HabitTypePickerFormIitem style={{marginTop: 15}} />
          <Text style={[styles.titleText, {marginTop: 19}]}>
            How often you want to do it?
          </Text>
          <HabitDatePickerFormItem style={{marginTop: 15}} />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          // console.log('yea');
        }}
        style={{
          backgroundColor: '#FF6E50',
          height: 56,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'gilroy-bold',
    lineHeight: 24,
    fontSize: 20,
    fontWeight: '600',
  },
});
