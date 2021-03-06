/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import Calendar from '../../Components/Calendar';
import AddHabitScreen from '../AddHabit';
import HabitList from './HabitList';
import OverviewCard from './OverviewCard';

export default function Home() {
  const [selectDate, setSelectDate] = useState(moment());
  const refRBSheet = useRef();

  const handleCrateHabitSheetClose = () => {
    refRBSheet.current.close();
  };

  return (
    <View>
      <View style={{backgroundColor: '#fff', height: 800, padding: 16}}>
        <Text style={styles.headText}>
          Let’s make some {'\n'}great habit together
        </Text>
        <OverviewCard />
        <Calendar
          value={selectDate}
          onChange={v => {
            setSelectDate(v);
          }}
          blockAfter={moment()}
        />

        <View
          style={{
            height: Dimensions.get('window').height - 480,
            marginTop: 20,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizonalScrollIndicator={false}>
            <HabitList calenderDate={selectDate} />
            <TouchableOpacity
              style={{marginBottom: 30}}
              onPress={() => {
                refRBSheet.current.open();
              }}>
              <Text style={styles.addHabitButText}>+ Add a habit</Text>
            </TouchableOpacity>
          </ScrollView>
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
          <AddHabitScreen close={handleCrateHabitSheetClose} />
        </RBSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headText: {
    fontSize: 24,
    lineHeight: 29,
    color: '#212525',
    marginBottom: 20,
    fontFamily: 'Gilroy-Sami-Bold',
    marginTop: 17,
  },
  addHabitButText: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#212525',
  },
});
