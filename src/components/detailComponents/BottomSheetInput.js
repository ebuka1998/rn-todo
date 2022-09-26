import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Input, Button, Icon} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';

const BottomSheetInput = ({
  refRBSheet,
  showFab,
  selectedColor,
  taskValue,
  changeTaskValue,
  createTask,
  openDateTime,
}) => {
  const {colors} = useTheme();
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      onClose={showFab}
      openDuration={250}
      height={150}
      customStyles={{
        wrapper: {
          backgroundColor: '#0f0f0f',
          opacity: 0.7,
        },
        container: {
          backgroundColor: colors.card,
          paddingTop: 0,
          display: 'flex',
          justifyContent: 'center',
        },
        draggableIcon: {
          backgroundColor: '#000',
          opacity: 0,
        },
      }}>
      <View>
        <View style={styles.inputView}>
          <Input
            placeholder="Add task"
            value={taskValue}
            onChangeText={changeTaskValue}
            inputStyle={{color: colors.text}}
            selectionColor={colors.text}
            style={{borderBottomWidth: 0}}
            autoFocus={true}
            containerStyle={{
              paddingHorizontal: 0,
              width: 350,
              borderBottomColor: 'transparent',
            }}
          />
          <Button
            type="solid"
            onPress={createTask}
            disabled={taskValue.length === 0 ? true : false}
            buttonStyle={{backgroundColor: selectedColor}}>
            <AntDesign name="arrowup" color="white" />
          </Button>
        </View>
        {/* <Pressable onPress={openDateTime}>
          <View
            style={{
              paddingHorizontal: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: colors.text, paddingRight: 5}}>
              Add reminder
            </Text>
            <Ionicons name="notifications-sharp" color={colors.text} />
          </View>
        </Pressable> */}
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  inputView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
export default BottomSheetInput;
