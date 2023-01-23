import React from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import menu from "../../../assets/menu3.png";

export default function Header() {
  function dropdown() {
    return (
      <View>
        <Text>teste</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={dropdown}>
        <Image source={menu} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: "15%",
  },
});
