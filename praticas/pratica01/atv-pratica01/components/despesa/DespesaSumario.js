import {View, Text, StyleSheet} from 'react-native'

function DespesaSumario({despesas, periodo}){
    const somaDespesas = despesas.reduce((total, despesa)=> {
        return total + despesa.valor;
    }, 0);


    return (
        <View style={styles.summaryContainer}>
            <Text style={styles.periodText}>{periodo}</Text>
            <Text style={styles.sumText}>{somaDespesas.toFixed(2)}</Text>
        </View>
    );

}

export default DespesaSumario

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: '#a9a9a9', 
    padding: 12,
    borderRadius: 6,
    flexDirection: 'row',      
    justifyContent: 'space-between', 
    alignItems: 'center',       
    margin: 8,                  
  },
  periodText: {
    color: 'white',             
    fontSize: 14,
    fontWeight: 'bold',
  },
  sumText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
