import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta, rotulo_lista_metas } from './mensagens';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View>
        <View>
        <TextInput style={styles.inputText}
                placeholder={rotulo_input_meta} />
        </View>
      <View>
        <Button title={rotulo_btn_cadastro_meta} />
      </View>
    </View>

    <View>
      <Text>title={rotulo_lista_metas}</Text>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
  },
  inputText:{
    borderColor: '#cccc',
    borderWidth: 1
  },
});
