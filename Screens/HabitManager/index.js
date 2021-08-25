import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const index = () => {
  return (
    <View style={styles.container}>
      <Text>This is Habit Page</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
