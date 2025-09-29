import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface PropTypes {
    title ?: string;
    onPress: () => void;
}
export default function CalcButton({title, onPress}: PropTypes) {
  return (
    <>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    </>
  )
}


const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: "#c8c9ccff",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { fontSize: 20, color: "#fff", fontWeight: "bold" },
});