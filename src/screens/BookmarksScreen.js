import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/config';

export default function BookmarksScreen({ navigation }) {
  const [bookmarks, setBookmarks] = useState([]);

  
  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const loadBookmarks = async () => {
    const saved = await AsyncStorage.getItem('bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Saved Articles</Text>
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookmarks yet.</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card} 
              onPress={() => navigation.navigate('Article', { article: item })}
            >
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 15 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: COLORS.text },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10, marginBottom: 10, padding: 10, elevation: 2 },
  image: { width: 80, height: 80, borderRadius: 8 },
  textContainer: { flex: 1, marginLeft: 10, justifyContent: 'center' },
  title: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: 'gray' }
});