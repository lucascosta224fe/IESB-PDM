import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

export default function CategoryItem({ category }) {
  // Se a categoria vier vazia por algum motivo, não quebra a tela
  if (!category) return null;

  // Usa os dados que vêm do banco (ajuste se o nome das suas colunas for diferente)
  const iconName = category.icon || "category"; // ícone padrão caso não tenha
  const categoryName = category.name || "Desconhecida";

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
        <MaterialIcons name={iconName} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.name}>{categoryName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // Espaço entre o ícone e o texto
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    color: colors.primaryText,
    fontWeight: "600",
  },
});