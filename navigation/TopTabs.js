import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Habits from '../Screens/HabitDetails/index';
import Progress from '../Screens/inProgress/inProgress.js';

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Progress" component={Progress} />
      <Tab.Screen name="Habits" component={Habits} />
    </Tab.Navigator>
  );
};

export default TopTabs;
