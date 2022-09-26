import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import SearchIcon from '../iconComponent/SearchIcon';
import {Avatar} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Header = () => {
  const {colors} = useTheme();
  const {user} = useSelector(store => store.user);

  return (
    <View style={[styles.container, {backgroundColor: colors.card}]}>
      <View style={styles.nameContainer}>
        <Avatar
          size={30}
          rounded
          icon={{name: 'rowing'}}
          containerStyle={{backgroundColor: '#00a7f7'}}
          source={{uri: user.user.photo}}
        />
        <View style={{paddingLeft: 10}}>
          <Text style={{color: colors.text}}>{user.user.email}</Text>
          <Text style={{color: colors.text}}>{user.user.name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  iconContainer: {
    paddingRight: 10,
  },
  textContainer: {
    display: 'flex',
  },
});
export default Header;
