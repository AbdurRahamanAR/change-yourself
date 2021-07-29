/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DaySelect from '../../Components/Calendar/DaySelect';
import Icon from '../../Components/Icon';
import PercentageCircle from '../../Components/ProgressCricle';
import SummaryCard from './SummaryCard';

export default function TaskDetails({task}) {
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
        <TouchableOpacity>
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
          Repeat everyday
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
            {task.finised}
          </Text>
        </View>
        <PercentageCircle
          percent={70}
          radius={22.5}
          borderWidth={4}
          color="#f5f3fc"
          shadowColor="#FF6E50"
          bgColor="#FFF"
        />
      </View>
      <SummaryCard />
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
      {/* <Text>{JSON.stringify(task, null, 2)}</Text> */}
      <DaySelect />
    </View>
  );
}
