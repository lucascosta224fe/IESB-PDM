import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { categories } from "../constants/categories";
import { colors } from "../constants/colors";

export default function CategoryItem({ category }) {
  // Fallback: Se a categoria não for encontrada, usa "food" por padrão para evitar que o app feche (crash)
  const categoryConfig = categories[category] ?? categories.food;

  return (
    <View
      style={[styles.background, { backgroundColor: categoryConfig.background }]}
    >
      <MaterialIcons
        name={categoryConfig.icon}
        size={24}
        color={colors.primaryContrast}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});