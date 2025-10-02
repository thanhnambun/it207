import React, { useState, useEffect } from "react";
import { View, TextInput, Text, FlatList, StyleSheet } from "react-native";
import useDebounce from "./useDebounce"; // import hook vừa tạo

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    // gọi API khi query đã debounce
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${debouncedQuery}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error(err));
  }, [debouncedQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên để tìm..."
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  item: {
    padding: 8,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
