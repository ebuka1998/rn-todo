import {View, Text} from 'react-native';
import React, {useState} from 'react';
import TaskTile from './TaskTile';
import {ListItem, Icon} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';

const CompletedTile = ({
  completedTasks,
  setCompleted,
  selectedColor,
  deleteTask,
  markAsImportant,
}) => {
  const [expanded, setExpanded] = useState(false);
  const {colors} = useTheme();
  return (
    <View>
      <ListItem.Accordion
        animation={{type: 'timing', duration: '100ms'}}
        containerStyle={{
          backgroundColor: colors.card,
        }}
        content={
          <>
            {/* <Icon name="place" size={30} color={colors.text} /> */}
            <Text style={{paddingRight: 10}}>{completedTasks?.length}</Text>
            <ListItem.Content>
              <ListItem.Title style={{color: colors.text}}>
                Completed
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        icon={
          <Icon
            name={'chevron-right'}
            type="material-community"
            color={colors.text}
          />
        }
        expandIcon={
          <Icon
            name={'chevron-up'}
            type="material-community"
            color={colors.text}
          />
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        {completedTasks?.map((cmt, i) => (
          <TaskTile
            isCompleted={cmt.isCompleted}
            isImportant={cmt.isImportant}
            key={i}
            markAsImportant={() => markAsImportant(cmt.id, cmt.isImportant)}
            setCompleted={() => setCompleted(cmt.id, cmt.isCompleted)}
            deleteTask={() => deleteTask(cmt.id)}
            title={cmt.taskTitle}
            selectedColor={selectedColor}
            height={80}
          />
        ))}
      </ListItem.Accordion>
    </View>
  );
};

export default CompletedTile;
