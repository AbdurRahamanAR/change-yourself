import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import Icon from '../Components/Icon';
import HabitManager from '../Screens/HabitManager';
import Home from '../Screens/Home';

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
    component: HabitManager,
  },
];

const bottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 70,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
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
              tabBarItemStyle: {
                paddingBottom: 11,
                paddingTop: 12,
              },
              tabBarIcon: ({focused}) => {
                const color = focused ? '#FF6E50' : 'rgba(4, 4, 5, 0.4)';
                return (
                  <View style={styles.tabItemRoot}>
                    <Icon size={24} name={item.iconName} color={color} />
                    <Text style={[styles.tabLabel, {color}]}>{item.name}</Text>
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
  tabLabel: {marginTop: 5},
});

export default bottomTabs;
