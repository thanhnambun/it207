import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface PropTypes {
  avatar ?: string;
  name ?: string;
  title ?: string;
  contact ?: string;
}

export default function BusinessCard({avatar, name, title, contact}:PropTypes) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: avatar }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.contact}>📞 {contact}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: 300,
    alignSelf: 'center',
    marginTop: 20,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
    fontStyle: 'italic'
  },
  contact: {
    fontSize: 14,
    color: '#333',
  },
});
