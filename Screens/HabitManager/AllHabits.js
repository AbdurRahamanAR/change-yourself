/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import HabitsList from './HabitsList';
import {Menu} from 'react-native-paper';
import Icon from '../../Components/Icon';
import {useHabitList} from '../../Components/HabitProvider';

export default function AllHabits() {
  const {habitList, deleteHabit} = useHabitList();
  const [selectedValue, setSelectedValue] = useState('Archived');

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.dropDownContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View style={styles.dotMenu}>
            <TouchableOpacity
              onPress={openMenu}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14}}>{selectedValue}</Text>
              <Icon name="downArrow" size={10} />
            </TouchableOpacity>
          </View>
        }>
        <Menu.Item
          onPress={() => {
            setSelectedValue('All');
          }}
          title="All"
        />
        <Menu.Item
          onPress={() => {
            setSelectedValue('Completed');
          }}
          title="Completed"
        />
        <Menu.Item
          onPress={() => {
            setSelectedValue('Archived');
          }}
          title="Archived"
        />
      </Menu>
      <HabitsList habits={habitList} handleDelete={deleteHabit} />
    </View>
  );
}

const styles = StyleSheet.create({
  dropDownContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  dotMenu: {
    height: 40,
    width: 117,
    borderWidth: 1,
    borderColor: 'rgba(4, 4, 5, 0.2)',
    marginTop: 20,
    marginLeft: 16,
    paddingLeft: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
});
