import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTheme} from '@react-navigation/native';

const NewListButton = ({goToDetailList}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={styles.container} onPress={goToDetailList}>
      <Text style={[styles.textStyle, {color: colors.text}]}>New List</Text>
      <Entypo size={20} name="plus" color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
    paddingLeft: 10,
    height: 20,
    position: 'absolute',
    alignItems: 'center',
    right: 20,
    zIndex: 1,
  },
  textStyle: {
    paddingLeft: 10,
    fontSize: 18,
  },
});
export default NewListButton;
