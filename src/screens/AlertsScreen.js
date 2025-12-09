import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/config';

// Emergency Alerts Data
const ALERTS = [
  { id: '1', type: 'Critical', title: 'Heavy Rain Warning', desc: 'Avoid low lying areas due to heavy rainfall prediction.', color: COLORS.danger, icon: 'thunderstorm' },
  { id: '2', type: 'Warning', title: 'Traffic Blockage', desc: 'Main Street closed due to construction.', color: COLORS.warning, icon: 'car' },
  { id: '3', type: 'Info', title: 'Vaccination Camp', desc: 'Free flu shots at City Hall this Sunday.', color: COLORS.success, icon: 'medkit' },
];

export default function AlertsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Emergency & Alerts</Text>
      <FlatList
        data={ALERTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderLeftColor: item.color, borderLeftWidth: 5 }]}>
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={24} color="#fff" />
            </View>
            <View style={styles.content}>
              <Text style={[styles.type, { color: item.color }]}>{item.type.toUpperCase()}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 15 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: COLORS.text },
  card: {
    backgroundColor: '#fff', borderRadius: 8, marginBottom: 15, flexDirection: 'row',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
    padding: 15
  },
  iconBox: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  content: { flex: 1 },
  type: { fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 2 },
  desc: { fontSize: 14, color: '#666' }
});