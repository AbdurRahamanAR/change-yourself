/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useHabitList} from '../../Components/HabitProvider';
import Icon from '../../Components/Icon';
import HabitDetails from '../HabitDetails';

const isDateInFrequency = (frequency, date) => {
  const todayInWeek = date.day();
  return frequency.includes(todayInWeek);
};

export default function HabitList({calenderDate}) {
  const YEAR = useMemo(() => {
    return calenderDate.year();
  }, [calenderDate]);
  const MONTH = useMemo(() => {
    return calenderDate.month() + 1;
  }, [calenderDate]);
  const DATE = useMemo(() => {
    return calenderDate.date();
  }, [calenderDate]);
  const refRBSheet = useRef();
  const [selectedTask, setSelectedTask] = useState();
  const {habitList, checkHabit} = useHabitList();

  return (
    <View style={{marginTop: 25}}>
      {habitList.map((task, index) => {
        const complete = task.completStatus[YEAR]?.[MONTH]?.[DATE - 1];
        const todayHave = isDateInFrequency(task.frequency, calenderDate);

        return !todayHave ? (
          <></>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setSelectedTask(task);
              refRBSheet.current.open();
            }}
            key={task.id}
            style={{marginTop: index === 0 ? 0 : 15}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={v => {
                  checkHabit(task.id, calenderDate);
                }}>
                <Icon
                  name="correct-square"
                  size={20}
                  color={complete ? '#FF6E50' : '#F5F3FC'}
                />
              </TouchableOpacity>

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
                {task.continue}/{task.streak}
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
                  width: `${(task.continue / task.streak) * 100}%`,
                  maxWidth: '100%',
                  backgroundColor: '#FF6E50',
                  height: 5,
                  borderRadius: 32,
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={449}
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
        <HabitDetails task={selectedTask} />
      </RBSheet>
    </View>
  );
}
