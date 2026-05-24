import { StyleSheet } from "react-native"
import { colors } from "../constants/colors"

export const globalStyles = StyleSheet.create({
  screenContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.background // Garante o fundo preto total da tela
  },
  content: {
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  input: {
    height: 44, // Aumentei um pouco para ficar mais confortável
    paddingHorizontal: 16,
    borderColor: "#444444", // Uma borda cinza escura suave
    borderWidth: 1,
    borderRadius: 8,
    flexGrow: 1,
    color: "#FFFFFF", // 🟢 Texto digitado agora é branco
    backgroundColor: "transparent" // Garante que não puxe branco de fundo
  },
  inputLabel: {
    fontSize: 16,
    color: colors.primaryText, // 🟢 Já definimos como branco ou amarelo claro no colors.js
    marginBottom: 4,
    fontWeight: '500' // Deixa um pouco mais elegante
  }
})