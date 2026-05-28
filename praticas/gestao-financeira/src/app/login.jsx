import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { globalStyles } from '../styles/globalStyles';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Validação simples de acesso conforme pedido
    if (name.trim() === '' || password.trim() === '') {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (password === '1234') { // Senha simples para o teste do professor
      // Navega para a Home dentro das Tabs
      router.replace({
        pathname: '/(tabs)',
        params: { userName: name } // Passando o nome para a Home
      });
    } else {
      Alert.alert("Acesso Negado", "Senha incorreta! Tente '1234'.");
    }
  };

  return (
    <View style={[globalStyles.screenContainer, styles.container]}>
      <View style={styles.header}>
        <Text style={styles.logo}>💰</Text>
        <Text style={styles.title}>Gestão Financeira</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome do Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#8b949e"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#8b949e"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 60, marginBottom: 10 },
  title: { color: '#FFD700', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#8b949e', fontSize: 16 },
  form: { width: '100%' },
  label: { color: '#fff', marginBottom: 8, fontSize: 14, fontWeight: '600' },
  input: {
    backgroundColor: '#161b22',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#30363d'
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: { color: '#0d1117', fontSize: 16, fontWeight: 'bold' }
});