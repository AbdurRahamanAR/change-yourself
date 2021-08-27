/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DaySelect from '../../Components/Calendar/DaySelect';
import Icon from '../../Components/Icon';
import PercentageCircle from '../../Components/ProgressCricle';
import AddHabitScreen from '../AddHabit';
import SummaryCard from './SummaryCard';

export default function HabitDetails({task, close}) {
  const strength = Math.round((task.continue / task.streak) * 100);
  const [edit, setEdit] = useState(false);

  if (edit) {
    return <AddHabitScreen close={close} mode="update" initialValues={task} />;
  }

  return (
    <View style={{paddingTop: 7, paddingHorizontal: 16, paddingBottom: 32}}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: 'Gilroy-Bold',
            fontSize: 28,
            lineHeight: 39,
            color: '#212525',
          }}>
          {task.title}
        </Text>
        <TouchableOpacity onPress={() => setEdit(true)}>
          <Text
            style={{
              fontFamily: 'Gilroy-Bold',
              fontSize: 16,
              lineHeight: 24,
              color: '#FF6E50',
            }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 5, flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="repeat" size={14} />
        <Text
          style={{
            fontFamily: 'Gilroy-Sami-Bold',
            fontSize: 14,
            lineHeight: 19,
            color: '#212525',
            marginLeft: 6,
          }}>
          {task.frequency.length === 7
            ? 'Repeat everyday'
            : `${task.frequency.length} days in week`}
        </Text>
      </View>
      <View
        style={{
          marginTop: 25,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 25,
        }}>
        <View>
          <Text
            style={{
              fontFamily: 'Gilroy-Sami-Bold',
              fontSize: 14,
              lineHeight: 19,
              color: '#212525',
            }}>
            Strength
          </Text>
          <Text
            style={{
              fontFamily: 'Gilroy-Bold',
              fontSize: 28,
              lineHeight: 39,
              color: '#212525',
              marginTop: 5,
            }}>
            {strength}%
          </Text>
        </View>
        <PercentageCircle
          percent={strength}
          radius={22.5}
          borderWidth={4}
          color="#FF6E50"
          shadowColor="#f5f3fc"
          bgColor="#FFF"
        />
      </View>
      <SummaryCard currentStreak={task.continue} bestStreak={task.bestStreak} />
      <Text
        style={{
          fontFamily: 'Gilroy-Bold',
          fontSize: 20,
          lineHeight: 35,
          color: '#212525',
          marginTop: 25,
        }}>
        Activity
      </Text>
      <DaySelect />
    </View>
  );
}
