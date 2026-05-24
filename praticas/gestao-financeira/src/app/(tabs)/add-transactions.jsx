import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext, useEffect, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { MoneyContext } from '../../contexts/GlobalState';
import { globalStyles } from '../../styles/globalStyles';
import DescriptionInput from '../../components/DescriptionInput'; 
import CurrencyInput from '../../components/CurrencyInput';
import DatePicker from '../../components/DatePicker';
import CategoryPicker from '../../components/CategoryPicker';
import Button from '../../components/Button';

const initialForm = {
  description: "",
  value: "",
  date: new Date(),
  category: "", 
};

export default function AddTransaction() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  const { transactions, addTransaction, updateTransaction } = useContext(MoneyContext);
  
  // CORREÇÃO: Você precisa do estado 'form' para os componentes filhos funcionarem
  const [form, setForm] = useState(initialForm);
  const valueInputRef = useRef(null);

  // 🔵 Lógica de Edição: Carrega os dados se houver um ID
  useEffect(() => {
    if (id && transactions.length > 0) {
      const itemParaEditar = transactions.find(t => String(t.id) === String(id));
      if (itemParaEditar) {
        setForm({
          description: itemParaEditar.description,
          value: String(itemParaEditar.value),
          date: new Date(itemParaEditar.date),
          category: itemParaEditar.categoryId, // Garante que o Picker selecione a categoria correta
        });
      }
    }
  }, [id, transactions]);

  const handleSave = async () => {
    // Validação básica
    if (!form.description || !form.value || !form.category) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const dadosTransacao = {
        description: form.description,
        value: Number(form.value),
        date: form.date.toISOString(),
        categoryId: form.category,
      };

      if (id) {
        // EDIÇÃO
        await updateTransaction(id, dadosTransacao);
        Alert.alert("Sucesso!", "Transação atualizada!");
      } else {
        // CADASTRO NOVO
        await addTransaction(dadosTransacao);
        Alert.alert("Sucesso!", "Transação adicionada!");
      }

      router.back(); // Volta para a lista após salvar
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={globalStyles.screenContainer} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        style={globalStyles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <DescriptionInput form={form} setForm={setForm} valueInputRef={valueInputRef} />
          <CurrencyInput form={form} setForm={setForm} valueInputRef={valueInputRef} />
          <DatePicker form={form} setForm={setForm} />
          <CategoryPicker form={form} setForm={setForm} />
        </View>
        
        {/* O texto do botão muda dinamicamente */}
        <Button onPress={handleSave}>{id ? "Salvar Alterações" : "Adicionar"}</Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12, marginBottom: 40, marginTop: 10 },
});