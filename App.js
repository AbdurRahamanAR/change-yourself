import React from 'react';
import Navigation from './navigation/index';
import {View} from 'react-native';
import moment from 'moment';

export const TODAY_MOMENT = moment();
export const CURRENT_MONTH = TODAY_MOMENT.month() + 1;
export const CURRENT_YEAR = TODAY_MOMENT.year();
export const TODAY_DATE = TODAY_MOMENT.date();

const App = () => {
  return (
    <View style={{flex: 1, height: '100%'}}>
      <Navigation />
    </View>
  );
};

export default App;
