import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import { useContext, useState, useMemo } from "react";
import { PieChart } from "react-native-chart-kit"; // Biblioteca de gráficos
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";

export default function ResumoScreen() {
  const { transactions, loading } = useContext(MoneyContext);
  const [currentDate, setCurrentDate] = useState(new Date());

  const screenWidth = Dimensions.get("window").width;

  // LÓGICA: Preparar dados para o Gráfico de Pizza
  const chartData = useMemo(() => {
    const groups = {};

    // Filtra apenas por data, removendo a trava de "isIncome === false"
    const allTransactions = transactions?.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getFullYear() === currentDate.getFullYear();
    }) || [];

    allTransactions.forEach(t => {
      const catName = t.category?.displayName || "Outros"; // Nome limpo
      const color = t.category?.background || (t.category?.isIncome ? "#4ade80" : "#f87171");

      if (!groups[catName]) {
        groups[catName] = {
          name: catName,
          population: 0,
          color: color,
          legendFontColor: "#FFF",
          legendFontSize: 12
        };
      }
      groups[catName].population += Math.abs(Number(t.value));
    });

    return Object.values(groups);
  }, [transactions, currentDate]);

  const totalGeral = chartData.reduce((acc, curr) => acc + curr.population, 0);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  const saldoReal = useMemo(() => {
    return transactions?.reduce((acc, t) => {
      const itemDate = new Date(t.date);
      // Verifica se a transação pertence ao mês/ano visível
      if (
        itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getFullYear() === currentDate.getFullYear()
      ) {
        const isIncome = t.category?.isIncome;
        const val = Number(t.value);
        // Se for receita soma, se for despesa subtrai
        return isIncome ? acc + val : acc - val;
      }
      return acc;
    }, 0) || 0;
  }, [transactions, currentDate]);

  return (
    <ScrollView style={globalStyles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Gastos por Categoria</Text>
      </View>

      {/* SELETOR DE MÊS */}
      <View style={styles.filterContainer}>
        <Pressable onPress={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
          <MaterialIcons name="chevron-left" size={32} color="#FFD700" />
        </Pressable>
        <Text style={styles.monthText}>
          {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase()}
        </Text>
        <Pressable onPress={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
          <MaterialIcons name="chevron-right" size={32} color="#FFD700" />
        </Pressable>
      </View>

      {chartData.length > 0 ? (
        <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={{ color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})` }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 0]}
            absolute // Mostra os valores absolutos em vez de %
          />

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Movimentação Total (Saldo)</Text>
            <Text style={[
              styles.totalValue,
              { color: saldoReal >= 0 ? '#4ade80' : '#f87171' } // Verde se positivo, Vermelho se negativo
            ]}>
              {saldoReal < 0 ? `- R$ ${Math.abs(saldoReal).toFixed(2)}` : `R$ ${saldoReal.toFixed(2)}`}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.emptyText}>Nenhum gasto para este período. 🧊</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', marginTop: 50 },
  header: { padding: 20, paddingTop: 40 },
  title: { color: '#FFD700', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  monthText: { color: '#fff', fontWeight: 'bold' },
  chartContainer: { alignItems: 'center', marginTop: 20 },
  totalBox: { backgroundColor: '#161b22', padding: 20, borderRadius: 15, width: '90%', marginTop: 20, alignItems: 'center' },
  totalLabel: { color: '#8b949e', fontSize: 14 },
  totalValue: { color: '#f87171', fontSize: 26, fontWeight: 'bold' },
  emptyText: { color: '#8b949e', textAlign: 'center', marginTop: 100 }
});