import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import TopTabs from './TopTabs';

const HabitManager = () => {
  return (
    <NavigationContainer independent="true">
      <Text style={styles.title}>Habits</Text>
      <TopTabs />
    </NavigationContainer>
  );
};

export default HabitManager;

const styles = StyleSheet.create({
  title: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 16,
    color: '#212525',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
