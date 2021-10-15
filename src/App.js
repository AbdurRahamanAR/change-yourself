/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {ActivityIndicator, SafeAreaView, StatusBar, View} from 'react-native';
import moment from 'moment';
import {Provider} from 'react-native-paper';

import HabitProvider from './Provider/HabitProvider';
import IntroSlider from './Components/IntroSlider';
import Navigation from './navigation/index';
import useStorageState from './hooks/useStorageState';
import {STORAGE_KEY} from './constest';
import {theme} from './config';

export const TODAY_MOMENT = moment();
export const CURRENT_MONTH = TODAY_MOMENT.month() + 1;
export const CURRENT_YEAR = TODAY_MOMENT.year();
export const TODAY_DATE = TODAY_MOMENT.date();

const App = () => {
  const [showIntro, setShowIntro] = useStorageState(
    STORAGE_KEY.SHOW_INTRO,
    undefined,
    data => {
      return data ? true : false;
    },
  );

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (showIntro === undefined) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} />
      <SafeAreaView style={{flex: 1}}>
        <Provider theme={theme}>
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
      </SafeAreaView>
    </>
  );
};

export default App;
