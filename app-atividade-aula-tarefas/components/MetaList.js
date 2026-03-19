import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { rotulo_lista_metas } from '../mensagens';

export default function MetaList(props) {
  return (
    <View style={styles.goalsContainer}>
      <Text style={styles.title}>{rotulo_lista_metas}</Text>
      <ScrollView>
        {props.metas.map((meta, index) => (
          <View key={index} style={styles.goalItem}>
            <Text style={styles.goalText}>{meta}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  goalsContainer: {
    flex: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: 'white',
  },
});