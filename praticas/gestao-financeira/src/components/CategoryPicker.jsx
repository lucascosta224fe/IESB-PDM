import { useContext, useState } from "react";
import { StyleSheet, Text, View, Pressable, Modal, FlatList } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { MoneyContext } from "../contexts/GlobalState";
import { MaterialIcons } from "@expo/vector-icons";

export default function CategoryPicker({ form, setForm }) {
  const { categories } = useContext(MoneyContext);
  const [modalVisible, setModalVisible] = useState(false);

  // Busca o nome da categoria selecionada para exibir no botão
  const selectedCat = categories.find(c => c.id === form.category);

  const handleSelect = (id) => {
    setForm({ ...form, category: id });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={globalStyles.label}>Categoria</Text>
      
      {/* Botão que abre o seletor */}
      <Pressable 
        style={styles.pickerTrigger} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.triggerText, !selectedCat && { color: "#8b949e" }]}>
          {selectedCat ? selectedCat.displayName : "Selecione uma categoria..."}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#FFD700" />
      </Pressable>

      {/* Modal com a lista de categorias (Sempre Escura) */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma Categoria</Text>
            
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable 
                  style={styles.itemRow} 
                  onPress={() => handleSelect(item.id)}
                >
                  <View style={[styles.iconDot, { backgroundColor: item.background }]} />
                  <Text style={styles.itemText}>{item.displayName}</Text>
                  {form.category === item.id && (
                    <MaterialIcons name="check" size={20} color="#FFD700" />
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  pickerTrigger: {
    backgroundColor: "#1c2128",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#30363d",
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  triggerText: { color: "#ffffff", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1c2128",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#30363d",
    maxHeight: "60%",
    padding: 15,
  },
  modalTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d"
  },
  itemText: { color: "#ffffff", fontSize: 16, flex: 1 },
  iconDot: { width: 10, height: 10, borderRadius: 5, marginRight: 15 }
});