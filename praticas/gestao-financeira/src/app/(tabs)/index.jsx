import { Alert, Pressable, View, Text, ScrollView, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { useContext, useState, useMemo } from "react";
import { useRouter } from 'expo-router';
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  const { userName } = useLocalSearchParams();
  const finalName = userName || "Usuário";
  const { transactions, removeTransaction, loading } = useContext(MoneyContext);
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(new Date(newDate));
  };

  const filteredTransactions = useMemo(() => {
    return transactions?.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getFullYear() === currentDate.getFullYear();
    });
  }, [transactions, currentDate]);

  const confirmarExclusao = (item) => {
    const mensagem = `Deseja realmente excluir "${item.description}"?`;
    if (Platform.OS === 'web') {
      if (window.confirm(mensagem)) removeTransaction(item.id);
    } else {
      Alert.alert("Excluir", mensagem, [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => removeTransaction(item.id) }
      ]);
    }
  };

  if (loading) {
    return (
      <View style={[globalStyles.screenContainer, styles.center]}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <View style={globalStyles.screenContainer}>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeSubtitle}>Olá,</Text>
        <Text style={styles.welcomeTitle}>{finalName} 👋</Text>
      </View>

      <View style={styles.filterContainer}>
        <Pressable onPress={() => changeMonth(-1)}>
          <MaterialIcons name="chevron-left" size={32} color="#FFD700" />
        </Pressable>
        <Text style={styles.monthText}>
          {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase()}
        </Text>
        <Pressable onPress={() => changeMonth(1)}>
          <MaterialIcons name="chevron-right" size={32} color="#FFD700" />
        </Pressable>
      </View>

      <ScrollView style={globalStyles.content}>
        {filteredTransactions.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma transação neste mês. 💸</Text>
        ) : (
          filteredTransactions.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => router.push({ pathname: '/add-transactions', params: { id: item.id } })}
              onLongPress={() => confirmarExclusao(item)}
              delayLongPress={500}
              style={({ pressed }) => [
                styles.card,
                // DINÂMICO: A borda agora usa a cor da categoria
                { borderLeftColor: item.category?.background || '#FFD700', opacity: pressed ? 0.7 : 1 }
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={[styles.categoryBadge, { color: item.category?.background || '#FFD700' }]}>
                  {item.category?.displayName || "Geral"}
                </Text>
                <Text style={styles.date}>{new Date(item.date).toLocaleDateString('pt-BR')}</Text>
              </View>
              <Text style={[styles.value, { color: item.category?.isIncome ? '#4ade80' : '#f87171' }]}>
                {item.category?.isIncome ? '+' : '-'} R$ {Number(item.value).toFixed(2)}
              </Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
} // <--- AQUI ESTAVA FALTANDO FECHAR!

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#161b22',
    borderBottomWidth: 1,
    borderBottomColor: '#30363d'
  },
  monthText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  emptyText: { color: '#8b949e', textAlign: 'center', marginTop: 50, fontSize: 16 },
  card: {
    backgroundColor: '#161b22',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 6, // Um pouco mais grossa para destacar a cor da categoria
  },
  description: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  date: { color: '#8b949e', fontSize: 11, marginTop: 2 },
  value: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  welcomeTitle: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryBadge: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
    textTransform: 'uppercase'
  }
});