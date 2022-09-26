import {View, Text} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';
const SearchIcon = () => {
  const {colors} = useTheme();
  return <AntDesign name="search1" size={20} color={colors.text} />;
};

export default SearchIcon;
