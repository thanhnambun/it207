import React,{useState} from 'react'
import { View, Text,Button} from "react-native";
export default function Bt2() {
    const [count, setCount] = useState<number>(0);
    const handleIncrement = () => {
        setCount(count + 1);
    }
    const handleDecrement = () => {
        setCount(count - 1);
    }
  return (
    <View>
      <Text>Bt2</Text>
      <Text>count: {count}</Text>
      <Button title="Increment" onPress={handleIncrement}/>
      <Button title="Decrement" onPress={handleDecrement}/>
    </View>
  );
}
