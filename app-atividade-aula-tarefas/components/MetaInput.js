import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from '../mensagens';

export default function MetaInput(props) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={rotulo_input_meta}
        style={styles.textInput}
        onChangeText={props.onInputChange}
        value={props.inputValue}
      />
      <Button 
        title={rotulo_btn_cadastro_meta} 
        onPress={props.onAddMeta} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 24,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
});