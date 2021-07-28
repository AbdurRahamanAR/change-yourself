/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

import PercentageCircle from '../../Components/ProgressCricle';

export default function OverviewCard() {
  return (
    <View
      style={{
        width: '100%',
        height: 95,
        backgroundColor: '#FF6E50',
        borderRadius: 12,
        paddingTop: 14,
        paddingLeft: 21,
        paddingBottom: 12,
        paddingRight: 21,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View>
        <PercentageCircle
          percent={70}
          radius={34.46}
          borderWidth={4}
          color="#fff"
          shadowColor="#FF6E50"
          bgColor="#FF6E50">
          <Text
            style={{
              fontSize: 15.21,
              lineHeight: 17,
              color: '#fff',
              fontFamily: 'Gilroy-Medium',
            }}>
            70%
          </Text>
        </PercentageCircle>
      </View>
      <View style={{marginLeft: 30}}>
        <Text
          style={{
            fontSize: 16,
            color: '#fff',
            lineHeight: 17,
            fontFamily: 'Gilroy-Sami-Bold',
          }}>
          Your daily goals are {'\n'}almost done
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontSize: 11,
            lineHeight: 17,
            color: '#fff',
            fontFamily: 'Gilroy-Regular',
          }}>
          4 of 10 completed
        </Text>
      </View>
    </View>
  );
}
