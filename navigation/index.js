import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './Tabs';

const NavigationTheme = {
  colors: {
    background: 'white',
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <Tabs />
    </NavigationContainer>
  );
}
