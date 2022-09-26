import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

const ColorBox = ({boxColor, setColor, isChecked}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: boxColor}]}
      onPress={setColor}
      activeOpacity={0.6}>
      {isChecked && <Entypo name="dot-single" color="white" size={25} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});

export default ColorBox;
