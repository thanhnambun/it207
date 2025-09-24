import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Bai1() {
  return (
    <>
        <View style={styles.card}>
            <Image
                source={{ uri: 'https://fastly.picsum.photos/id/223/100/100.jpg?hmac=DiS2pEERondTeuza2Fhznq4LjbbT6_zTwo6tjD5OJt8' }} 
                style={styles.avatar}
            />
            <Text style={styles.name}>Nguyễn Thị Lan Anh</Text>
            <Text style={styles.description}>
                React Native Developer | UI/UX Enthusiast
            </Text>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    // đổ bóng (Android + iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // bo tròn
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
