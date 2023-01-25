import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from "react-native";

export default function MenuCadastrar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao}>
        <Image style={{ width: 40, height: 40 }} />
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Image style={{ width: 40, height: 40 }} />
        <Text style={styles.text}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Image style={{ width: 40, height: 40 }} />
        <Text style={styles.text}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "8%",
    // backgroundColor: "rgba(255,255,255,0.1)",
    // borderBottomColor: "rgba(255,255,255,0.5)",
    // borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  botao: {
    width: "auto",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
    marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 5,
  },
});
