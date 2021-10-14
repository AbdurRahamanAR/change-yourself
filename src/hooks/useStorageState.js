import {useRef} from 'react';
import {useEffect, useState} from 'react';
import {getStoreData, storeData} from '../store';

const defaultDataExtector = data => {
  return data;
};

const useStorageState = (
  key,
  initialValue,
  dataExtector = defaultDataExtector,
) => {
  const [state, setState] = useState(initialValue);
  const safeDataExtector = useRef(dataExtector).current;

  useEffect(() => {
    getStoreData(key).then(data => {
      setState(safeDataExtector(data));
    });
  }, [key, safeDataExtector]);

  const handleSetState = value => {
    const valueIsFunction = typeof value === 'function';
    const orgValue = valueIsFunction ? value(state) : value;
    setState(orgValue);
    // TODO: check for faliar
    storeData(key, orgValue);
  };

  return [state, handleSetState];
};

export default useStorageState;
