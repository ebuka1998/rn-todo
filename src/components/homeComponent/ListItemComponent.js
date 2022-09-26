import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {ListItem} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';

const ListItemComponent = ({listName, listColor, goToDetail}) => {
  const {colors} = useTheme();
  return (
    <ListItem
      containerStyle={{backgroundColor: colors.card, marginTop: 10}}
      onPress={goToDetail}>
      <Feather size={20} name="list" color={listColor} />
      <ListItem.Content>
        <ListItem.Title style={{color: colors.text}}>{listName}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default ListItemComponent;
