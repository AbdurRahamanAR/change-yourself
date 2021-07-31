/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

export default function SummaryCard({currentStreak, bestStreak}) {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: '#F5F3FC',
        borderRadius: 19,
        paddingTop: 18,
        paddingBottom: 12,
        height: 80,
        flexDirection: 'row',
      }}>
      <View style={{width: '50%', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Gilroy-Bold',
            fontSize: 18,
            lineHeight: 23,
            color: '#FF6E50',
          }}>
          {currentStreak} Days
        </Text>
        <Text
          style={{
            fontFamily: 'Gilroy-Sami-Bold',
            fontSize: 14,
            lineHeight: 19,
            color: 'rgba(4, 4, 5, 0.5)',
            marginTop: 5,
          }}>
          Current Streak
        </Text>
      </View>
      <View style={{width: 2, backgroundColor: '#F5F3FC', height: 50}} />
      <View style={{width: '49%', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Gilroy-Bold',
            fontSize: 18,
            lineHeight: 23,
            color: '#FF6E50',
          }}>
          {bestStreak} Days
        </Text>
        <Text
          style={{
            fontFamily: 'Gilroy-Sami-Bold',
            fontSize: 14,
            lineHeight: 19,
            color: 'rgba(4, 4, 5, 0.5)',
            marginTop: 5,
          }}>
          Best Streak
        </Text>
      </View>
    </View>
  );
}
