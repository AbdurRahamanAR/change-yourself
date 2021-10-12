import moment from 'moment';
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

import DaySelect from './DaySelect';
import MonthSelect from './MonthSelect';
import YearSelect from './YearSelect';

export default function Calendar({onChange, value, blockAfter}) {
  const [selectMonth, setSelectMonth] = useState(value.month() + 1);
  const [selectYear, setSelectYear] = useState(value.year());
  const [selectDay, setSelectDay] = useState(value.date());
  const safeOnChange = useRef(onChange);

  useEffect(() => {
    safeOnChange.current(
      moment(`${selectDay} ${selectMonth} ${selectYear}`, 'DD MM YYYY'),
    );
  }, [selectDay, selectMonth, selectYear]);

  return (
    <View style={styles.root}>
      <YearSelect
        value={selectYear}
        onChange={newYear => {
          setSelectYear(newYear);
          setSelectMonth(1);
          setSelectDay(1);
        }}
        blockAfter={blockAfter.year()}
      />

      <MonthSelect
        value={selectMonth}
        onChange={newMonth => {
          setSelectMonth(newMonth);
          setSelectDay(1);
        }}
        selectYear={selectYear}
        blockAfter={{year: blockAfter.year(), month: blockAfter.month() + 1}}
      />

      <DaySelect
        month={selectMonth}
        year={selectYear}
        value={selectDay}
        onChange={newDay => setSelectDay(newDay)}
        blockAfter={{
          date: blockAfter.date(),
          year: blockAfter.year(),
          month: blockAfter.month() + 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 25,
  },
});

Calendar.defaultProps = {
  onChange: () => {},
};

Calendar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(moment),
  blockAfter: PropTypes.instanceOf(moment),
};
