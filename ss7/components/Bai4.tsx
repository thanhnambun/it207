import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNetInfo } from '@react-native-community/netinfo';

export default function Bai4() {
    const netInfo = useNetInfo();

    if(netInfo.isInternetReachable === false || netInfo.isConnected === false) {
      return (
        <View style={styles.container}>
            <View style={styles.bannerOff}>
              <Text style={styles.text}>Không có kết nối mạng</Text>
            </View>
            <Text style={styles.title}>Trạng thái kết nối mạng</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Có kết nối không? </Text>
              <Text style={styles.value}>{netInfo.isConnected ? "Có" : "Không"}</Text>
            </View>
        </View>
        
        
      )
    }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Trạng thái kết nối mạng</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Có kết nối không? </Text>
          <Text style={styles.value}>{netInfo.isConnected ? "Có" : "Không"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Loại kết nối: </Text>
          <Text style={styles.value}>{netInfo.type}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ebebff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 320,
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#050505ff',
    marginBottom: 30,
    letterSpacing: 0.5
  },
  row: {
    flexDirection: 'row',
    width: 220,
    marginBottom: 14
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  value: {
    fontSize: 16,
    color: '#0b0c0cff',
    fontWeight: 'bold'
  },
  bannerOff: {
    width: '100%',
    backgroundColor: '#e03a3aff',
    padding: 12,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
})