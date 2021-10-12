import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './BottomTabs';

const NavigationTheme = {
  colors: {
    background: 'white',
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <BottomTabs />
    </NavigationContainer>
  );
}
