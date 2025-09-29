import React from 'react'
import { View, Text, SectionList } from 'react-native'


export default function Bt5() {
    const Shop = [
        {
            title: "Điện thoại",
            data: [
                { name: "iPhone 15 Pro" },
                { name: "iPhone 14 Pro" },
                { name: "iPhone 13 Pro" },
            ],
        },
        {
            title: "Laptop",
            data: [
                { name: "MacBook Pro M1" },
                { name: "MacBook Pro M2" },
                { name: "MacBook Pro M3" },
            ],
        },
        {
            title: "Tablet",
            data: [
                { name: "iPad Air" },
            ],
        },
    ];
  return (
    <View>
      <Text>Bt5</Text>
      <SectionList
        sections={Shop}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}