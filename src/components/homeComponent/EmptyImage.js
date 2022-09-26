import {View, Text, Image} from 'react-native';
import React from 'react';

const EmptyImage = ({image, firstText, secondText, color}) => {
  return (
    <View style={{height: 500, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Image resizeMode="contain" style={{height: 300}} source={image} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: color,
            paddingBottom: 10,
          }}>
          {firstText}
        </Text>
        <Text style={{textAlign: 'center', fontSize: 20, color: color}}>
          {secondText}
        </Text>
      </View>
    </View>
  );
};

export default EmptyImage;
