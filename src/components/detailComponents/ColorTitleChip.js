import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const ColorTitleChip = ({chipColor}) => {
  return (
    <View style={[styles.container, {backgroundColor: chipColor}]}>
      <Text style={styles.textStyle}>Colour</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    width: 80,
  },
  textStyle: {
    color: 'white',
  },
});
export default ColorTitleChip;
