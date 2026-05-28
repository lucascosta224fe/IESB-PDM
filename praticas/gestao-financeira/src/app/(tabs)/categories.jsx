import { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { MoneyContext } from "../../contexts/GlobalState";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import { useRouter } from 'expo-router';

export default function CategoriesScreen() {
    const { categories, removeCategory } = useContext(MoneyContext);
    const router = useRouter();

    const handleDelete = (category) => {
        if (category.isDefault) {
            Alert.alert("Aviso", "Categorias padrão não podem ser excluídas.");
            return;
        }

        Alert.alert(
            "Excluir Categoria",
            `Tem certeza que deseja excluir "${category.displayName}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => removeCategory(category.id)
                }
            ]
        );
    };

    return (
        <View style={[globalStyles.screenContainer, { flex: 1, padding: 20 }]}>
            {/* Cabeçalho com Título e Botão de Adicionar */}
            <View style={styles.header}>
                <Text style={globalStyles.title}>Minhas Categorias</Text>
                <Pressable 
                    onPress={() => router.push('/add-category')}
                    style={styles.addButton}
                >
                    <MaterialIcons name="add" size={20} color="#000" />
                    <Text style={styles.addButtonText}>Adicionar</Text>
                </Pressable>
            </View>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={[styles.iconContainer, { backgroundColor: item.background }]}>
                            <MaterialIcons name={item.icon} size={20} color="#fff" />
                        </View>

                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.catName}>{item.displayName}</Text>
                            <Text style={styles.catType}>
                                {item.isIncome ? "Receita" : "Despesa"} • {item.isDefault ? "Sistema" : "Personalizada"}
                            </Text>
                        </View>

                        {!item.isDefault && (
                            <Pressable onPress={() => handleDelete(item)}>
                                <MaterialIcons name="delete-outline" size={24} color="#ff4444" />
                            </Pressable>
                        )}
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#FFD700',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
        gap: 4
    },
    addButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1c2128',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#30363d'
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    catName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    catType: { color: '#8b949e', fontSize: 12 }
});