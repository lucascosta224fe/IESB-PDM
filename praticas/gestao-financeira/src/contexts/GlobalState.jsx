import { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import { Alert } from "react-native";

export const MoneyContext = createContext();

export default function GlobalState({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função central para buscar tudo do banco de dados
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [cats, txs] = await Promise.all([
        api.listCategories(),
        api.listTransactions(),
      ]);
      setCategories(cats);
      setTransactions(txs);
    } catch (e) {
      setError(e.message ?? "Falha ao carregar dados do servidor");
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega os dados assim que o app abre
  useEffect(() => { refresh(); }, [refresh]);

  // Ações que modificam o banco de dados
  const addTransaction = useCallback(async (data) => {
    await api.createTransaction(data);
    await refresh();
  }, [refresh]);

  const removeTransaction = useCallback(async (id) => {
    try {
      await api.deleteTransaction(id); // Chama o DELETE na sua API Node
      await refresh(); // Atualiza a lista automaticamente
    } catch (e) {
      Alert.alert("Erro", "Não foi possível excluir a transação.");
    }
  }, [refresh]);

  const addCategory = useCallback(async (data) => {
    await api.createCategory(data);
    await refresh();
  }, [refresh]);

  const removeCategory = useCallback(async (id) => {
    await api.deleteCategory(id);
    await refresh();
  }, [refresh]);

  const updateTransaction = useCallback(async (id, data) => {
    try {
      await api.updateTransaction(id, data);
      await refresh();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível atualizar a transação.");
    }
  }, [refresh]);

  const totalBalance = transactions.reduce((acc, tx) => {
    const category = categories.find(cat => cat.id === tx.categoryId);
    // Se for receita, soma. Se for despesa, subtrai.
    return category?.isIncome ? acc + tx.value : acc - tx.value;
  }, 0);

  // Cálculo separado para o gráfico de pizza (apenas despesas)
  const expenseTotal = transactions.reduce((acc, tx) => {
    const category = categories.find(cat => cat.id === tx.categoryId);
    return !category?.isIncome ? acc + tx.value : acc;
  }, 0);

  return (
    <MoneyContext.Provider value={{
      transactions, categories, loading, error, refresh,
      addTransaction, removeTransaction, addCategory, removeCategory, updateTransaction
    }}>
      {children}
    </MoneyContext.Provider>
  );
}