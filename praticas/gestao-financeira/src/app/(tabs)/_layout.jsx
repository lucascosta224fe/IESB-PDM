import { Tabs } from "expo-router";
import { colors } from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: colors.background }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.primaryContrast,
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopWidth: 0,
          elevation: 0,
          height: 60, // Aumentei um pouco para acomodar melhor os ícones
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#8b949e",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Transações",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" size={28} color={color} />
          ),
        }}
      />

      {/* 🆕 ABA DE CATEGORIAS (Inserida aqui para manter o equilíbrio) */}
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categorias",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-transactions"
        options={{
          title: "Adicionar",
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <MaterialIcons name="add" size={40} color={colors.primaryContrast} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="resumo"
        options={{
          title: "Resumo",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="pie-chart" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 56, // Ajustado para não cortar no layout
    width: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    marginTop: -20, // Faz o botão saltar um pouco para fora da barra
    borderWidth: 4,
    borderColor: "#000000", // Cria um contorno para destacar do fundo preto
  },
});