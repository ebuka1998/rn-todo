import {View, ActivityIndicator} from 'react-native';
import React from 'react';

const Loading = ({color}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default Loading;
