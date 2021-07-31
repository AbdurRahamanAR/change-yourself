/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';

const colors = [
  '#FF6363',
  '#88B8FF',
  '#FF97FB',
  '#6D8DFF',
  '#FF7A7A',
  '#FFA47C',
];

export default function HabitColorPickerFormItem({style = {}}) {
  const [activeColor, setActiveColor] = useState(colors[0]);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}>
      {colors.map(item => (
        <TouchableOpacity
          onPress={event => {
            console.log(item);
            setActiveColor(item);
          }}
          key={item}>
          <View
            style={{
              borderWidth: activeColor === item ? 1 : 0,
              borderColor: activeColor === item ? item : '#fff',
              borderRadius: 11,
              marginRight: 10,
            }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: item,
                borderWidth: activeColor === item ? 1 : 0,
                borderColor: activeColor === item ? '#fff' : '#fff',
              }}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
