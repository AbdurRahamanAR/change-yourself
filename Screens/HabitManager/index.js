import React from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import TopTabs from '../../navigation/TopTabs';

const index = () => {
  return (
    <NavigationContainer independent="true">
      <TopTabs />
    </NavigationContainer>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
