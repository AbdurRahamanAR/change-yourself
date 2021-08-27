import moment from 'moment';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import uuid from 'react-native-uuid';
import {CURRENT_MONTH, CURRENT_YEAR} from '../App';

const HabitContext = React.createContext();

export const useHabitList = () => {
  const habitList = useContext(HabitContext);

  return habitList;
};

export const getLastFrequencyDate = (
  frequency,
  from = moment().startOf('day'),
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

export const isDateInFrequency = (frequency, date) => {
  const todayInWeek = date.day();
  return frequency.includes(todayInWeek);
};

const HabitProvider = ({children}) => {
  const resetContinueDone = useRef(false);
  const lastmonth = Array(31);
  lastmonth[30] = true;

  const [habitList, setHabitList] = useState([
    {
      id: uuid.v4(),
      title: 'Yoga',
      streak: 21,
      type: 'do',
      frequency: [0, 1, 2, 3, 6],
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
      resetContinueDone.current = true;
      const newHabitList = habitList.map(habit => {
        return resetHabitContinue(habit);
      });
      setHabitList(newHabitList);
    }
  }, [habitList, resetContinueDone]);

  const checkHabit = useCallback(
    (habitId, date) => {
      const YEAR = date.year();
      const MONTH = date.month() + 1;
      const DATE = date.date();
      const newTaskList = habitList.map(item => {
        if (item.id === habitId) {
          let dateListData = [];
          if (item?.completStatus?.[YEAR]?.[MONTH]) {
            dateListData = item?.completStatus?.[YEAR]?.[MONTH];
          }
          const operationType = dateListData[DATE - 1]
            ? 'unchecked'
            : 'checked';
          item.continue =
            operationType === 'unchecked'
              ? item.continue - 1
              : item.continue + 1;
          if (item.continue > item.bestStreak) {
            item.bestStreak = item.continue;
          }
          dateListData[DATE - 1] = operationType === 'unchecked' ? false : true;
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
    },
    [habitList],
  );

  const totalComplete = useCallback(
    (forDate = moment()) => {
      const year = forDate.year();
      const month = forDate.month() + 1;
      const date = forDate.date();
      let completed = 0;
      habitList.map(item => {
        if (item.completStatus[year]?.[month]?.[date - 1]) {
          completed += 1;
        }
      });
      console.log('call', completed, date, forDate.date());
      return completed;
    },
    [habitList],
  );

  const getHabitListForADate = useCallback(
    (forDate = moment()) => {
      return habitList.filter(item => {
        return isDateInFrequency(item.frequency, forDate);
      });
    },
    [habitList],
  );

  const addHabit = ({title, streak = 21, type, frequency}) => {
    console.log(frequency, 'cool');
    setHabitList(state => {
      return [
        ...state,
        {
          id: uuid.v4(),
          title,
          streak,
          type,
          frequency,
          bestStreak: 0,
          continue: 0,
          completStatus: {
            [CURRENT_YEAR]: {
              [CURRENT_MONTH]: [],
            },
          },
        },
      ];
    });
  };

  const updateHabit = ({title, streak = 21, type, id, frequency}) => {
    console.log(frequency, 'cool');
    setHabitList(state => {
      return state.map(item => {
        if (item.id === id) {
          return {
            ...item,
            title,
            streak,
            type,
            frequency,
          };
        }
        return item;
      });
    });
  };

  return (
    <HabitContext.Provider
      value={{
        habitList,
        checkHabit,
        totalComplete,
        addHabit,
        getHabitListForADate,
        updateHabit,
      }}>
      {children}
    </HabitContext.Provider>
  );
};
export default HabitProvider;
