import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AllHabits from './AllHabits';
import InProgress from './InProgress';

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: '#ffffff',
        },
        tabBarActiveTintColor: '#FF7115',
        tabBarInactiveTintColor: '#212525',
        tabBarIndicatorStyle: {
          backgroundColor: '#FF7115',
          height: 2,
        },
        tabBarItemStyle: {},
        tabBarLabelStyle: {
          textTransform: 'none',
          fontSize: 16,
          fontWeight: '500',
        },
      }}>
      <Tab.Screen name="Progress" component={InProgress} />
      <Tab.Screen name="All Habits" component={AllHabits} />
    </Tab.Navigator>
  );
};

export default TopTabs;
