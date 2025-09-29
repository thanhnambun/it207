import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.button, liked ? styles.liked : styles.unliked]}
      onPress={() => setLiked(!liked)}
    >
      <Ionicons
        name={liked ? 'thumbs-up' : 'thumbs-up-outline'}
        size={50}
        color="#fff"
        style={styles.icon}
      />
      <Text style={styles.text}>{liked ? 'Đã thích' : 'Thích'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 10,
  },
  unliked: {
    backgroundColor: '#aaa',
  },
  liked: {
    backgroundColor: '#007BFF',
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
