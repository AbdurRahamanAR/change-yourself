/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Formik} from 'formik';
import HabitDatePickerFormItem from './HabitDatePickerFormItem';
import HabitTypePickerFormIitem from './HabitTypePickerFormIitem';

export const habit_types = {
  DO: 'do',
  DONT: 'dont',
};

// {
//   id: 1,
//   title: 'Yoga',
//   streak: 21,
//   type: "do"
//   frequency: [0, 1, 2, 3, 4, 5, 6],
//   bestStreak: 0,
//   continue: 20,
//   completStatus: {
//     2021: {
//       7: lastmonth,
//       8: [true, false],
//     },
//   },
// },

export default function AddHabitScreen() {
  const initialValues = {
    name: '',
    type: habit_types.DO,
    frequency: [],
  };

  const createHabit = values => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={createHabit}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
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
              <View style={{marginTop: 15}}>
                <TextInput
                  placeholder="Habit Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  autoFocus
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: 'rgba(4, 4, 5, 0.4)',
                    fontWeight: 'normal',
                  }}
                />
              </View>
              <Text style={[styles.titleText, {marginTop: 19}]}>
                Types of habit
              </Text>
              <HabitTypePickerFormIitem
                value={values.type}
                onChange={handleChange('type')}
                style={{marginTop: 15}}
              />
              <Text style={[styles.titleText, {marginTop: 29}]}>
                How often you want to do it?
              </Text>
              <HabitDatePickerFormItem
                value={values.frequency}
                style={{marginTop: 15}}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: '#FF6E50',
              height: 56,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 32,
            }}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'gilroy-bold',
    lineHeight: 24,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
