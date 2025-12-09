import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/config';

export default function ArticleScreen({ route, navigation }) {
  const { article } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkBookmark();
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleBookmark}>
          <Ionicons 
            name={isBookmarked ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={COLORS.primary} 
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isBookmarked]);

  const checkBookmark = async () => {
    try {
      const saved = await AsyncStorage.getItem('bookmarks');
      const bookmarks = saved ? JSON.parse(saved) : [];
      const exists = bookmarks.some(b => b.url === article.url);
      setIsBookmarked(exists);
    } catch (e) { console.error(e); }
  };

  // Bookmarking Logic
  const toggleBookmark = async () => {
    try {
      const saved = await AsyncStorage.getItem('bookmarks');
      let bookmarks = saved ? JSON.parse(saved) : [];

      if (isBookmarked) {
        bookmarks = bookmarks.filter(b => b.url !== article.url);
        Alert.alert("Removed", "Article removed from bookmarks.");
      } else {
        bookmarks.push(article);
        Alert.alert("Saved", "Article added to bookmarks.");
      }

      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(!isBookmarked);
    } catch (e) { console.error(e); }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 3️⃣ WebView Integration */}
      <WebView source={{ uri: article.url }} startInLoadingState={true} />
    </View>
  );
}