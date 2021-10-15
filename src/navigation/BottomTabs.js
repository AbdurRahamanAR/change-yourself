import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import Icon from '../Components/Icon';
import HabitManager from '../Screens/HabitManager';
import Home from '../Screens/Home';
import {useTheme} from 'react-native-paper';

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

const BottomTabs = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
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
                backgroundColor: '#fff',
              },
              headerShown: false,
              tabBarItemStyle: {
                height: 70,
                backgroundColor: '#fff',
              },
              tabBarIcon: ({focused}) => {
                const color = focused ? colors.primary : colors.textSecondary;
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
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  tabItemItem: {
    width: 25,
    height: 25,
  },
  tabLabel: {marginTop: 5},
});
export default BottomTabs;
