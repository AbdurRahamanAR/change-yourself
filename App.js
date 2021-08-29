/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Navigation from './navigation/index';
import {View} from 'react-native';
import moment from 'moment';
import IntroSlider from './Components/IntroSlider';
import {useState} from 'react';
import {Provider} from 'react-native-paper';
import HabitProvider from './Components/HabitProvider';

export const TODAY_MOMENT = moment();
export const CURRENT_MONTH = TODAY_MOMENT.month() + 1;
export const CURRENT_YEAR = TODAY_MOMENT.year();
export const TODAY_DATE = TODAY_MOMENT.date();

const App = () => {
  const [showIntro, setShowIntro] = useState(false);
  return (
    <Provider>
      <HabitProvider>
        <View style={{flex: 1, height: '100%'}}>
          {showIntro ? (
            <Navigation />
          ) : (
            <IntroSlider onDone={() => setShowIntro(true)} />
          )}
        </View>
      </HabitProvider>
    </Provider>
  );
};

export default App;
