/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import Icon from '../../Components/Icon';

const taskList = [
  {
    id: 1,
    title: 'Yoga',
    complete: true,
    finised: '50%',
  },
  {
    id: 2,
    title: 'Wake up early',
    complete: true,
    finised: '30%',
  },
  {
    id: 3,
    title: 'Donnt drink alcohol',
    complete: false,
    finised: '90%',
  },
];

export default function TaskList() {
  return (
    <View style={{marginTop: 25}}>
      {taskList.map((task, index) => {
        return (
          <View key={task.id} style={{marginTop: index === 0 ? 0 : 15}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <Icon
                name="correct-square"
                size={20}
                color={task.complete ? '#FF6E50' : '#F5F3FC'}
              />
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#212525',
                  lineHeight: 24,
                }}>
                {task.title}
              </Text>
              <Text
                style={{
                  marginLeft: 'auto',
                  color: 'rgba(33, 37, 37, 0.4)',
                  fontSize: 12,
                  lineHeight: 19,
                }}>
                12/100
              </Text>
            </View>
            <View
              style={{
                marginTop: 11,
                width: '100%',
                backgroundColor: '#F5F5F7',
                height: 5,
                borderRadius: 32,
              }}>
              <View
                style={{
                  width: '50%',
                  backgroundColor: '#FF6E50',
                  height: 5,
                  borderRadius: 32,
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
