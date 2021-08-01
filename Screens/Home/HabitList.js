/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
  TODAY_DATE,
  TODAY_MOMENT,
} from '../../Components/Calendar';
import Icon from '../../Components/Icon';
import HabitDetails from '../HabitDetails';

export let domeData = [
  {
    id: 1,
    title: 'Yoga',
    streak: 21,
    frequency: [0, 1, 2, 3, 4, 5, 6],
    bestStreak: 0,
    continue: 0,
    completStatus: {},
  },
];

const getLastFrequencyDate = frequency => {
  const todayInWeek = TODAY_MOMENT.day();
  const lessFrequencyDates = frequency.filter(item => item < todayInWeek);
  const lastFrequencyDate = Math.max(...lessFrequencyDates);
  const deff = todayInWeek - lastFrequencyDate;

  return moment(
    `${TODAY_DATE - deff}/${CURRENT_MONTH}/${CURRENT_YEAR}`,
    'DD/MM/YYYY',
  );
};

const isDateInFrequency = (frequency, date) => {
  const todayInWeek = date.day();
  console.log(todayInWeek, frequency);
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
  const [taskList, setTaskList] = useState(domeData);
  const refRBSheet = useRef();
  const [selectedTask, setSelectedTask] = useState();

  const completeTask = taskId => {
    const newTaskList = taskList.map(item => {
      if (item.id === taskId) {
        let dateListData = [];
        if (item?.completStatus?.[YEAR]?.[MONTH]) {
          dateListData = item?.completStatus?.[YEAR]?.[MONTH];
        }
        item.continue = item.continue + 1;
        if (item.continue > item.bestStreak) {
          item.bestStreak = item.continue;
        }
        dateListData[DATE - 1] = dateListData[DATE - 1] ? false : true;
        item.completStatus = {
          ...item.completStatus,
          [YEAR]: {
            ...item.completStatus?.[YEAR],
            [MONTH]: dateListData,
          },
        };
      }
      return item;
    });
    setTaskList(newTaskList);
  };

  return (
    <View style={{marginTop: 25}}>
      {taskList.map((task, index) => {
        const complete = task.completStatus[YEAR]?.[MONTH]?.[DATE - 1];
        const todayHave = isDateInFrequency(task.frequency, calenderDate);
        const lastFrequencyDate = getLastFrequencyDate(task.frequency);
        const lastDayNotComplete =
          task.completStatus[lastFrequencyDate.year()]?.[
            lastFrequencyDate.month()
          ]?.[lastFrequencyDate.date() - 1];

        if (lastDayNotComplete && task.continue > 0) {
          setTaskList(state => {
            return state.map(item => {
              if (item.id === task.id) {
                item.continue = 0;
              }
              return item;
            });
          });
        }
        console.log(todayHave);
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
                  completeTask(task.id);
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
