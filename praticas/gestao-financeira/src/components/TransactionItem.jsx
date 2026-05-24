import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import CategoryItem from "./CategoryItem";

export default function TransactionItem({
  category,
  date,
  description,
  value,
}) {
  // 🟢 Estilização baseada no banco: A categoria já diz se é receita (isIncome)
  const valueStyle = category.isIncome
      ? globalStyles.positiveText
      : globalStyles.negativeText;

  // 🟢 O Prisma envia o Decimal como String. Precisamos converter para Número!
  const numericValue = Number(value);

  return (
    <>
      <View style={styles.itemContainer}>
        {/* Passamos o objeto categoria inteiro para o CategoryItem */}
        <CategoryItem category={category} />
        <View style={styles.textContainer}>
          
          {/* DATA */}
          <Text style={[globalStyles.secondaryText, { color: '#8b949e' }]}>
            {new Date(date).toLocaleDateString("pt-BR")}
          </Text>
          
          <View style={styles.bottomLineContainer}>
            
            {/* DESCRIÇÃO */}
            <Text style={[globalStyles.primaryText, { color: '#c9d1d9' }]}>
              {description}
            </Text>
            
            {/* VALOR: Agora com a formatação numérica correta e cor dinâmica */}
            <Text style={valueStyle}>
              {numericValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
            
          </View>
        </View>
      </View>
      
      {/* LINHA DIVISÓRIA */}
      <View style={[globalStyles.line, { backgroundColor: '#30363d', opacity: 1 }]} />
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
  },
  textContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    paddingVertical: 8,
  },
  bottomLineContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});