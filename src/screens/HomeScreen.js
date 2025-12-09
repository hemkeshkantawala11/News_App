import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet, 
  Modal, ActivityIndicator, RefreshControl 
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { API_KEY, API_URL, COLORS, CITIES } from '../constants/config';

export default function HomeScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [city, setCity] = useState('New York');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?q=${city}&apiKey=${API_KEY}`);
      setNews(response.data.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [city]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Article', { article: item })}
    >
      {item.urlToImage ? (
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
          <Ionicons name="image-outline" size={40} color="#fff" />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.date}>{new Date(item.publishedAt).toDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with City Selector */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>City Pulse</Text>
        <TouchableOpacity style={styles.cityBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.cityBtnText}>{city}</Text>
          <Ionicons name="chevron-down" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* News List */}
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchNews} />}
          contentContainerStyle={{ padding: 10 }}
        />
      )}

      {/* 1️⃣ City Selection Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select a City</Text>
            {CITIES.map((c) => (
              <TouchableOpacity 
                key={c} 
                style={styles.modalItem} 
                onPress={() => { setCity(c); setModalVisible(false); }}
              >
                <Text style={[styles.modalText, city === c && { color: COLORS.primary, fontWeight: 'bold' }]}>
                  {c}
                </Text>
                {city === c && <Ionicons name="checkmark" size={20} color={COLORS.primary} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 15, backgroundColor: COLORS.primary,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  cityBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 20 },
  cityBtnText: { color: '#fff', marginRight: 5, fontWeight: '600' },
  card: {
    backgroundColor: COLORS.card, borderRadius: 12, marginBottom: 15,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
    overflow: 'hidden'
  },
  image: { width: '100%', height: 180 },
  textContainer: { padding: 12 },
  title: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  desc: { fontSize: 14, color: '#64748B', marginBottom: 8 },
  date: { fontSize: 12, color: '#94A3B8' },
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between' },
  modalText: { fontSize: 16 },
  closeBtn: { marginTop: 20, backgroundColor: COLORS.secondary, padding: 15, borderRadius: 10, alignItems: 'center' }
});