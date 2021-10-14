import moment from 'moment';
import React, {useMemo} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useHabitList} from '../../Provider/HabitProvider';

import PercentageCircle from '../../Components/ProgressCricle';
import {theme} from '../../config';
import {calculateParsentige} from '../../utils';

export default function OverviewCard({todayList}) {
  const {totalComplete, getHabitListForADate} = useHabitList();
  const [completed, setCompleted] = useState(0);
  const habitList = useMemo(() => {
    return getHabitListForADate(moment());
  }, [getHabitListForADate]);

  useEffect(() => {
    setCompleted(totalComplete());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habitList]);

  const totalCompletePersentige = calculateParsentige(
    completed,
    habitList.length,
  );

  return (
    <View style={styles.root}>
      <View>
        <PercentageCircle
          percent={totalCompletePersentige}
          radius={34.46}
          borderWidth={4}
          color="#fff"
          shadowColor="#FF6E50"
          bgColor="#FF6E50">
          <Text style={styles.persentigeText}>{totalCompletePersentige}%</Text>
        </PercentageCircle>
      </View>
      <View style={styles.textInfoSection}>
        <Text style={styles.headLine}>
          Your daily goals are {'\n'}almost done
        </Text>
        <Text style={styles.completeInfoText}>
          {completed} of {habitList.length} completed
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 95,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingTop: 14,
    paddingLeft: 21,
    paddingBottom: 12,
    paddingRight: 21,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInfoSection: {marginLeft: 30},
  persentigeText: {
    fontSize: 15.21,
    lineHeight: 17,
    color: '#fff',
    fontFamily: 'Gilroy-Medium',
  },
  headLine: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 17,
    fontFamily: 'Gilroy-Sami-Bold',
  },
  completeInfoText: {
    marginTop: 6,
    fontSize: 11,
    lineHeight: 17,
    color: '#fff',
    fontFamily: 'Gilroy-Regular',
  },
});
