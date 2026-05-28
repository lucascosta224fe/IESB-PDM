import { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MoneyContext } from '../contexts/GlobalState';
import { globalStyles } from '../styles/globalStyles';

export default function AddCategory() {
  const router = useRouter();
  const { addCategory } = useContext(MoneyContext);
  
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [color, setColor] = useState('#FFD700');
  const [isIncome, setIsIncome] = useState(false);

  const handleSave = async () => {
    if (!displayName || !name) {
      Alert.alert("Erro", "Preencha o nome da categoria.");
      return;
    }

    const newCat = {
      name: name.toLowerCase().trim(), // ex: "health"
      displayName,                    // ex: "Saúde"
      icon: "attach-money",           // Ícone padrão
      background: color,
      isIncome
    };

    await addCategory(newCat);
    Alert.alert("Sucesso", "Categoria criada!");
    router.back();
  };

  return (
    <View style={globalStyles.screenContainer}>
      <View style={globalStyles.content}>
        <Text style={styles.label}>Nome Interno (ex: food)</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="food" placeholderTextColor="#8b949e" />

        <Text style={styles.label}>Nome de Exibição (ex: Alimentação)</Text>
        <TextInput style={styles.input} value={displayName} onChangeText={setDisplayName} placeholder="Alimentação" placeholderTextColor="#8b949e" />

        <Text style={styles.label}>Cor (Hexadecimal)</Text>
        <TextInput style={styles.input} value={color} onChangeText={setColor} />

        <Pressable 
          style={[styles.typeButton, { backgroundColor: isIncome ? '#4ade80' : '#f87171' }]} 
          onPress={() => setIsIncome(!isIncome)}
        >
          <Text style={styles.buttonText}>{isIncome ? "Tipo: Receita" : "Tipo: Despesa"}</Text>
        </Pressable>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Categoria</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: '#fff', marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#161b22', color: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#30363d' },
  typeButton: { padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  saveButton: { backgroundColor: '#FFD700', padding: 18, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  saveButtonText: { color: '#0d1117', fontWeight: 'bold', fontSize: 16 }
});