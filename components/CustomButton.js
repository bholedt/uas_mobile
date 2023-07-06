import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({ title, onPress, color }) => {
  const styles = {
    buton: {
      padding: 25,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 5,
      marginTop: 20,
      marginBottom: 30,
      backgroundColor: color,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      alignSelf: "center",
    },
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.buton}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
