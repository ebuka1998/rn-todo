import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {Dialog, Input} from '@rneui/themed';
import ColorBox from './ColorBox';
import ColorTitleChip from './ColorTitleChip';
import {useTheme} from '@react-navigation/native';

const CreateListModal = ({
  isVisible,
  closeModal,
  colorList,
  changeColor,
  isChecked,
  selectedColor,
  listValue,
  onChangeValue,
  createList,
  textMaxValue,
}) => {
  const {colors} = useTheme();
  return (
    <Dialog isVisible={isVisible} overlayStyle={{backgroundColor: colors.card}}>
      <Dialog.Title
        title="New List"
        titleStyle={{fontSize: 14, color: colors.text}}
      />
      <View>
        <Input
          autoFocus={false}
          autoCorrect={false}
          placeholder="Enter list title"
          style={[styles.inputStyle, {borderBottomColor: selectedColor}]}
          containerStyle={{
            paddingHorizontal: 0,
            // paddingVertical: 5,
            borderBottomColor: selectedColor,
            borderColor: selectedColor,
          }}
          inputStyle={{color: colors.text}}
          selectionColor={colors.text}
          value={listValue}
          onChangeText={onChangeValue}
          maxLength={textMaxValue}
        />
        <Text
          style={{
            alignSelf: 'flex-end',
          }}>{`${listValue.length} / ${textMaxValue}`}</Text>
        <ColorTitleChip chipColor={selectedColor} />
        <ScrollView style={styles.colorBoxContainer} horizontal={true}>
          {colorList.map((color, i) => (
            <ColorBox
              boxColor={color.color}
              key={color.id}
              isChecked={isChecked === i}
              setColor={() => changeColor(i, color.color)}
            />
          ))}
        </ScrollView>
      </View>
      <Dialog.Actions>
        <View style={styles.buttonContainer}>
          <Dialog.Button
            title="CANCEL"
            onPress={closeModal}
            titleStyle={{color: colors.text}}
          />
          <Dialog.Button
            title="CREATE LIST"
            disabled={listValue.length === 0 ? true : false}
            titleStyle={{color: colors.text}}
            onPress={createList}
          />
        </View>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  colorBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
  },
});

export default CreateListModal;
