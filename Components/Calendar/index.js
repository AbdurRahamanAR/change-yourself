import moment from 'moment';
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

import DaySelect from './DaySelect';
import MonthSelect from './MonthSelect';
import YearSelect from './YearSelect';

export default function Calendar({onChange, value}) {
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
        onChange={newYear => setSelectYear(newYear)}
      />

      <MonthSelect
        value={selectMonth}
        onChange={newMonth => setSelectMonth(newMonth)}
      />

      <DaySelect
        month={selectMonth}
        year={selectYear}
        value={selectDay}
        onChange={newDay => setSelectDay(newDay)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 25,
  },
});

MonthSelect.defaultProps = {
  onChange: () => {},
};

MonthSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(moment),
};
