import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from '../../Components/Icon';
import habitData from './habitData.json';
import {Provider, Menu} from 'react-native-paper';

const HabitsList = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  console.log(habitData);
  return (
    <View style={styles.container}>
      {habitData.map(habit => (
        <View style={styles.habitsContainer}>
          <Text style={styles.habits}>{habit.habitName}</Text>
          <Provider>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Icon
                  style={styles.dotMenu}
                  onPress={openMenu}
                  size={17}
                  name="dotMenu"
                />
              }>
              <Menu.Item onPress={() => {}} title="Item 1" />
              <Menu.Item onPress={() => {}} title="Item 2" />
              <Menu.Item onPress={() => {}} title="Item 3" />
            </Menu>
          </Provider>
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
  },
  habitsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#040405',
    flexDirection: 'row',
    alignItems: 'center',
  },
  habit: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
