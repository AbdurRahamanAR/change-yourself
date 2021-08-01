import React, {useContext, useEffect, useRef, useState} from 'react';
import {TODAY_MOMENT} from './Calendar';

const HabitContext = React.createContext();

export const useHabitList = () => {
  const habitList = useContext(HabitContext);

  return habitList;
};

export const getLastFrequencyDate = (
  frequency,
  from = TODAY_MOMENT.startOf('day'),
) => {
  const todayInWeek = from.day();
  const lessFrequencyDates = frequency.filter(item => item < todayInWeek);
  let lastFrequencyDateDiff;
  if (lessFrequencyDates.length !== 0) {
    lastFrequencyDateDiff = todayInWeek - Math.max(...lessFrequencyDates);
  } else {
    lastFrequencyDateDiff = 7 + (todayInWeek - Math.max(...frequency));
  }
  return from.subtract(lastFrequencyDateDiff, 'days');
};

export const resetHabitContinue = habit => {
  const lastFrequencyDate = getLastFrequencyDate(habit.frequency);
  const lastDayNotComplete =
    habit.completStatus[lastFrequencyDate.year()]?.[
      lastFrequencyDate.month() + 1
    ]?.[lastFrequencyDate.date() - 1];

  if (!lastDayNotComplete && habit.continue > 0) {
    habit.continue = 0;
    return habit;
  } else {
    return habit;
  }
};

const HabitProvider = ({children}) => {
  const resetContinueDone = useRef(false);
  const lastmonth = Array(31);
  lastmonth[30] = true;

  const [habitList, setHabitList] = useState([
    {
      id: 1,
      title: 'Yoga',
      streak: 21,
      frequency: [0, 1, 2, 3, 4, 5, 6],
      bestStreak: 0,
      continue: 20,
      completStatus: {
        2021: {
          7: lastmonth,
          8: [true, false],
        },
      },
    },
  ]);

  useEffect(() => {
    if (!resetContinueDone.current) {
      console.log('run');
      resetContinueDone.current = true;
      const newHabitList = habitList.map(habit => {
        return resetHabitContinue(habit);
      });
      setHabitList(newHabitList);
    }
  }, [habitList, resetContinueDone]);

  const checkHabit = (habitId, date) => {
    const YEAR = date.year();
    const MONTH = date.month() + 1;
    const DATE = date.date();

    const newTaskList = habitList.map(item => {
      if (item.id === habitId) {
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
    setHabitList(newTaskList);
  };

  return (
    <HabitContext.Provider value={{habitList, checkHabit}}>
      {children}
    </HabitContext.Provider>
  );
};
export default HabitProvider;
