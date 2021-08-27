import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../../Components/Icon';
import habitData from './habitData.json';
import {Menu} from 'react-native-paper';

const HabitsList = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = name => setVisible(name);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      {habitData.map(habit => (
        <View style={styles.habitsContainer}>
          <Text style={styles.habits}>{habit.habitName}</Text>
          <View style={styles.dotMenu}>
            <Menu
              visible={visible === habit.habitName}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity
                  onPress={() => {
                    openMenu(habit.habitName);
                  }}>
                  <Icon size={17} name="dotMenu" />
                </TouchableOpacity>
              }>
              <Menu.Item onPress={() => {}} title="Delete" />
              <Menu.Item onPress={() => {}} title="Edit" />
            </Menu>
          </View>
        </View>
      ))}
    </View>
  );
};
export default HabitsList;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  dotMenu: {
    marginLeft: 'auto',
    paddingRight: 26,
  },
  habitsContainer: {
    paddingTop: 32,
    paddingBottom: 22,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(4, 4, 5, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  habits: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
