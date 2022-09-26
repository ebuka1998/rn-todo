import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Divider, useTheme} from '@rneui/themed';

const Background = () => {
  return (
    <View style={styles.container}>
      <Divider style={{paddingTop: 10, marginTop: 30}} />
      <Divider style={{paddingTop: 10, marginTop: 80}} />
      <Divider style={{paddingTop: 10, marginTop: 80}} />
      <Divider style={{paddingTop: 10, marginTop: 80}} />
      <Divider style={{paddingTop: 10, marginTop: 80}} />
      <Divider style={{paddingTop: 10, marginTop: 80}} />
      <Divider style={{paddingTop: 10, marginTop: 80}} />
      <Divider style={{paddingTop: 10, marginTop: 80}} />
      <Divider style={{paddingTop: 10, marginTop: 80}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
export default Background;
