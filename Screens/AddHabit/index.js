/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';

import HabitDatePickerFormItem from './HabitDatePickerFormItem';
import HabitTypePickerFormIitem from './HabitTypePickerFormIitem';
import {useHabitList} from '../../Components/HabitProvider';

export const habit_types = {
  DO: 'do',
  DONT: 'dont',
};

const defaultInitialValues = {
  title: '',
  type: habit_types.DO,
  frequency: [],
  streak: 21,
};

const stepOneSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Habit name is required!'),
  type: Yup.string().required('Required'),
});

const stepTwoSchema = Yup.object().shape({});

const addHabitFormSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, 'Name is too long!')
    .required('Habit name is required!'),
  type: Yup.string().required('Required'),
  frequency: Yup.array().min(1, 'At least select 1 day!').required('Required'),
  streak: Yup.number().typeError('Must be a number!').required('Requied'),
});

export const ErrroMessageViewer = ({error}) => {
  return error ? <Text style={{color: 'tomato'}}>{error}</Text> : null;
};

export default function AddHabitScreen({
  close,
  initialValues = defaultInitialValues,
  mode,
}) {
  const {addHabit} = useHabitList();
  const [step, setStep] = useState(1);

  const createHabit = values => {
    addHabit(values);
    close();
  };

  const updateHabit = values => {
    console.log(values);
  };

  return (
    <Formik
      validationSchema={addHabitFormSchema}
      initialValues={initialValues}
      onSubmit={mode === 'update' ? updateHabit : createHabit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        validateForm,
        errors,
      }) => (
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
              {step === 1 && (
                <>
                  <Text style={styles.titleText}>Habit you want to form?</Text>
                  <View style={{marginTop: 15}}>
                    <TextInput
                      placeholder="Habit Name"
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                      autoFocus
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        color: 'rgba(4, 4, 5, 0.4)',
                        fontWeight: 'normal',
                      }}
                    />
                    <ErrroMessageViewer error={errors.title} />
                  </View>
                  <Text style={[styles.titleText, {marginTop: 19}]}>
                    Types of habit
                  </Text>
                  <HabitTypePickerFormIitem
                    value={values.type}
                    onChange={handleChange('type')}
                    style={{marginTop: 15}}
                  />
                  <ErrroMessageViewer error={errors.type} />
                </>
              )}
              {step === 2 && (
                <>
                  <Text style={[styles.titleText, {marginTop: -20}]}>
                    How often you want to do it?
                  </Text>
                  <HabitDatePickerFormItem
                    value={values.frequency}
                    onChange={v => {
                      setFieldValue('frequency', v);
                    }}
                    style={{marginTop: 15}}
                    error={errors.frequency}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 29,
                    }}>
                    <Text style={[styles.titleText]}>
                      What your target days?
                    </Text>
                    <View style={{marginLeft: 'auto'}}>
                      <ErrroMessageViewer error={errors.streak} />
                    </View>
                  </View>
                  <View style={{marginTop: 15}}>
                    <TextInput
                      placeholder="Streak"
                      onChangeText={handleChange('streak')}
                      onBlur={handleBlur('streak')}
                      value={values.streak}
                      keyboardType="decimal-pad"
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        color: 'rgba(4, 4, 5, 0.4)',
                        fontWeight: 'normal',
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: 'rgba(4, 4, 5, 0.2)',
                        padding: 8,
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        color: 'rgba(4, 4, 5, 0.6)',
                      }}>
                      Expert recorment to use 21min day as strike that help you
                      to bet your habit
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (step === 1) {
                stepOneSchema.isValid(values).then(function (valid) {
                  if (valid) {
                    setStep(2);
                  } else {
                    validateForm();
                  }
                });
              } else {
                stepTwoSchema.isValid(values).then(function (valid) {
                  if (valid) {
                    handleSubmit();
                  } else {
                    validateForm();
                  }
                });
              }
            }}
            style={{
              backgroundColor: '#FF6E50',
              height: 56,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 32,
            }}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
              {step === 1 ? 'Next' : 'Done'}
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
