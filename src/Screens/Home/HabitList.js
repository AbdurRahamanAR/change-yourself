import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useHabitList} from '../../Provider/HabitProvider';
import Icon from '../../Components/Icon';
import {theme} from '../../config';

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
              checkHabit(task.id, calenderDate);
            }}
            key={task.id}
            style={{marginTop}}>
            <View style={styles.habitContainer}>
              <Icon
                name="correct-square"
                size={20}
                color={complete ? theme.colors.primary : '#F5F3FC'}
              />

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
    backgroundColor: theme.colors.accent,
    height: 5,
    borderRadius: 32,
  },
  streakStatusProgressBarProgress: {
    maxWidth: '100%',
    backgroundColor: theme.colors.primary,
    height: 5,
    borderRadius: 32,
  },
});
