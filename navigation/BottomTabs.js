import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/index';
import Habit from '../Screens/HabitManager/index';
import {StyleSheet, Text, View} from 'react-native';
import Icon from '../Components/Icon';

const Tab = createBottomTabNavigator();

const TabDataList = [
  {
    name: 'Home',
    iconName: 'home',
    component: Home,
  },
  {
    name: 'Habit',
    iconName: 'habit',
    component: Habit,
  },
];

const bottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#FFFFFF',
        },
      }}>
      {TabDataList.map(item => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              topBar: {
                backgroundColor: '#FFFFFF',
              },
              headerShown: false,
              tabBarIcon: ({focused}) => {
                const color = focused ? '#FF6E50' : '#040405';
                return (
                  <View style={styles.tabItemRoot}>
                    <Icon size={16} name={item.iconName} color={color} />
                    <Text style={{color}}>{item.name}</Text>
                  </View>
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabItemRoot: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemItem: {
    width: 25,
    height: 25,
  },
});

export default bottomTabs;
