import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {ListItem, Button} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TaskTile = ({
  selectedColor,
  title,
  setCompleted,
  isCompleted,
  height,
  deleteTask,
  markAsImportant,
  isImportant,
}) => {
  const {colors} = useTheme();
  return (
    <View style={{marginTop: 5}}>
      <ListItem.Swipeable
        containerStyle={{
          backgroundColor: colors.card,
          height: height,
        }}
        rightContent={() => (
          <Button
            title="Delete"
            onPress={deleteTask}
            icon={{name: 'delete', color: 'white'}}
            buttonStyle={{minHeight: '100%', backgroundColor: 'red'}}
          />
        )}>
        <TouchableOpacity onPress={setCompleted}>
          <MaterialCommunityIcons
            name={
              isCompleted
                ? 'checkbox-marked-circle'
                : 'checkbox-blank-circle-outline'
            }
            color={selectedColor}
            size={30}
          />
        </TouchableOpacity>

        <ListItem.Content>
          <ListItem.Title
            style={{
              color: colors.text,
              textDecorationLine: isCompleted ? 'line-through' : 'none',
            }}>
            {title}
          </ListItem.Title>
        </ListItem.Content>
        <TouchableOpacity onPress={markAsImportant}>
          <FontAwesome
            name={isImportant ? 'star' : 'star-o'}
            color={selectedColor}
            size={25}
          />
        </TouchableOpacity>
      </ListItem.Swipeable>
    </View>
  );
};

export default TaskTile;
