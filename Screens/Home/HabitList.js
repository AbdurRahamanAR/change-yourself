import React, {useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useHabitList} from '../../Components/HabitProvider';
import Icon from '../../Components/Icon';
import HabitDetails from '../HabitDetails';

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
  const {getHabitListForADate, checkHabit} = useHabitList();

  const habitList = getHabitListForADate(calenderDate);

  return (
    <View style={styles.root}>
      {habitList.map((task, index) => {
        const complete = task.completStatus[YEAR]?.[MONTH]?.[DATE - 1];
        const marginTop = index === 0 ? 0 : 15;

        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedTask(task);
              refRBSheet.current.open();
            }}
            key={task.id}
            style={{marginTop}}>
            <View style={styles.habitContainer}>
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

              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.streakStatus}>
                {task.continue}/{task.streak}
              </Text>
            </View>
            <View style={styles.streakStatusProgressBar}>
              <View
                style={{
                  ...styles.streakStatusProgressBarProgress,
                  width: `${(task.continue / task.streak) * 100}%`,
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
        <HabitDetails
          close={() => refRBSheet.current.close()}
          task={selectedTask}
        />
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 25,
  },
  habitContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212525',
    lineHeight: 24,
  },
  streakStatus: {
    marginLeft: 'auto',
    color: 'rgba(33, 37, 37, 0.4)',
    fontSize: 12,
    lineHeight: 19,
  },
  streakStatusProgressBar: {
    marginTop: 11,
    width: '100%',
    backgroundColor: '#F5F5F7',
    height: 5,
    borderRadius: 32,
  },
  streakStatusProgressBarProgress: {
    maxWidth: '100%',
    backgroundColor: '#FF6E50',
    height: 5,
    borderRadius: 32,
  },
});
