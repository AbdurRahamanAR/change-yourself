import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import HabitsList from './HabitsList';
import {Menu} from 'react-native-paper';
import Icon from '../../Components/Icon';

export default function AllHabits() {
  const [selectedValue, setSelectedValue] = useState('Archived');

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.dropDownContainer}>
      <View style={styles.dotMenu}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Text style={{fontSize: 14}}>Archived</Text>
              <Icon name="downArrow" size={10} />
            </TouchableOpacity>
          }>
          <Menu.Item onPress={() => {}} title="Delete" />
          <Menu.Item onPress={() => {}} title="Edit" />
        </Menu>
      </View>
      <HabitsList />
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
