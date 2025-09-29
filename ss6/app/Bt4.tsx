import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'

export default function Bt4() {
    const [data, setData] = useState([...Array(10).keys()])
    const[isRefreshing, setIsRefreshing] = useState(false)
    const handleRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            setData([...Array(10).keys()].map(i => i+1))
            setIsRefreshing(false)
        }, 2000)
    }
  return (
    <View>
      <Text>Bt4</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item) => item.toString()}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </View>
  )
}