import React from 'react';
import Navigation from './navigation/index';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './Screens/Home';
import HabitsList from './Screens/HabitManager/HabitsList';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={{flex: 1, height: '100%'}}>
      <Navigation />
      {/* <HabitsList /> */}
    </View>
  );
};

export default App;
