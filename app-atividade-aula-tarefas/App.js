import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

export default function App() {
  const [inputMetaText, setInputMetaText] = useState('');
  const [metas, setMetas] = useState([]);

  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  }

  function adicionarMetaHandler() {
    setMetas((currentMetas) => [...currentMetas, inputMetaText]);
    setInputMetaText('');
  }

  return (
    <View style={styles.appContainer}>
      <MetaInput 
        onInputChange={metaInputHandler} 
        onAddMeta={adicionarMetaHandler}
        inputValue={inputMetaText}
      />
      <MetaList metas={metas} />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});