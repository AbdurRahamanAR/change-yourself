import React from 'react';
import Icomoon from 'react-native-icomoon';
import json from '../assets/icons/selection.json';

export default function Icon({name, ...restProps}) {
  return <Icomoon iconSet={json} name={name} {...restProps} />;
}
