import { Text, TextInput, View } from "react-native"
import { globalStyles } from "../styles/globalStyles"

export default function DescriptionInput({ form, setForm, valueInputRef }) {
  return (
    <View>
      <Text style={globalStyles.inputLabel}>Descrição</Text>
      <TextInput
        value={form.description}
        returnKeyType="next"
        placeholder="Ex: Compra mercado" // Adicionei um placeholder de exemplo
        placeholderTextColor="#888888" // 🟢 Cor cinza para o placeholder
        onChangeText={(text) => setForm({ ...form, description: text })}
        onSubmitEditing={() => valueInputRef.current.focus()}
        style={[globalStyles.input, { color: '#FFFFFF' }]} // 🟢 Força o texto branco
      />
    </View>
  )
}