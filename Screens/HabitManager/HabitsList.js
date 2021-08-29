/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from '../../Components/Icon';
import {Menu} from 'react-native-paper';
import AddHabitScreen from '../AddHabit';
import HabitDetails from '../HabitDetails';

const HabitsList = ({habits, handleDelete}) => {
  const [visible, setVisible] = useState(false);
  const refRBSheet = useRef();
  const refHabitDetailsSheet = useRef();

  const handleCrateHabitSheetClose = () => {
    refRBSheet.current.close();
  };
  const openMenu = name => setVisible(name);
  const closeMenu = () => setVisible(false);

  return (
    <>
      <View style={styles.container}>
        {habits.map(habit => (
          <TouchableOpacity
            onPress={() => refHabitDetailsSheet.current.open()}
            key={habit.id}
            style={styles.habitsContainer}>
            <Text style={styles.habits}>{habit.title}</Text>
            <View style={styles.dotMenu}>
              <Menu
                visible={visible === habit.title}
                onDismiss={closeMenu}
                anchor={
                  <TouchableOpacity
                    style={{
                      width: 70,
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}
                    onPress={() => {
                      openMenu(habit.title);
                    }}>
                    <Icon size={17} name="dotMenu" />
                  </TouchableOpacity>
                }>
                <Menu.Item
                  onPress={() => {
                    refHabitDetailsSheet.current.open();
                    closeMenu();
                  }}
                  title="View"
                />
                <Menu.Item
                  onPress={() => {
                    refRBSheet.current.open();
                    closeMenu();
                  }}
                  title="Edit"
                />
                <Menu.Item
                  onPress={() => handleDelete(habit.id)}
                  title="Delete"
                />
              </Menu>
            </View>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              height={449}
              openDuration={500}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(33, 37, 37, 0.5)',
                },
                draggableIcon: {
                  width: 50,
                  backgroundColor: '#F5F3FC',
                  height: 3,
                },
                container: {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
              }}>
              <AddHabitScreen
                mode="update"
                initialValues={habit}
                close={handleCrateHabitSheetClose}
              />
            </RBSheet>
            <RBSheet
              ref={refHabitDetailsSheet}
              closeOnDragDown={true}
              height={449}
              openDuration={500}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(33, 37, 37, 0.5)',
                },
                draggableIcon: {
                  width: 50,
                  backgroundColor: '#F5F3FC',
                  height: 3,
                },
                container: {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
              }}>
              <HabitDetails
                close={() => refHabitDetailsSheet.current.close()}
                task={habit}
              />
            </RBSheet>
          </TouchableOpacity>
        ))}
      </View>
    </>
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
