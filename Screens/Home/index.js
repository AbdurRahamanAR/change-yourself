/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import Calendar from '../../Components/Calendar/index';
import AddHabitScreen from '../AddHabit';
import HabitList from './HabitList';
import OverviewCard from './OverviewCard';

export default function Home() {
  //TODO reset task contrue
  const [selectDate, setSelectDate] = useState(moment());
  const refRBSheet = useRef();

  return (
    <View style={{backgroundColor: '#fff', height: 800, padding: 16}}>
      <Text
        style={{
          fontSize: 24,
          lineHeight: 29,
          color: '#212525',
          marginBottom: 20,
          fontFamily: 'Gilroy-Sami-Bold',
          marginTop: 17,
        }}>
        Let’s make some {'\n'}great habit together
      </Text>
      <OverviewCard />
      <Calendar
        value={selectDate}
        onChange={v => {
          setSelectDate(v);
        }}
      />
      <HabitList calenderDate={selectDate} />
      <TouchableOpacity
        onPress={() => {
          refRBSheet.current.open();
        }}>
        <Text
          style={{
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 16,
            lineHeight: 20,
            color: '#212525',
          }}>
          + Add a habit
        </Text>
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={551}
        openDuration={500}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(33, 37, 37, 0.5)',
          },
          draggableIcon: {
            width: 50,
            backgroundColor: '#F5F3FC',
            height: 3,
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <AddHabitScreen />
      </RBSheet>
    </View>
  );
}
