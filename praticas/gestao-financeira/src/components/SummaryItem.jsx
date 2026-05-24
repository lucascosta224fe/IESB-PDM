import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import CategoryItem from "./CategoryItem";

export default function SummaryItem({ category, value }) {
  // Converte o valor para Número caso não seja
  const numericValue = Number(value);

  return (
    <View style={styles.container}>
      <CategoryItem category={category} />
      <Text style={[globalStyles.primaryText, { color: '#FFFFFF' }]}>
        {numericValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
});