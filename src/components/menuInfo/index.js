import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from "react-native";
import usersIcon from "../../../assets/users.png";
import logoutIcon from "../../../assets/logout.png";
import cadastroIcon from "../../../assets/cadastro.png";
import homeIcon from "../../../assets/home.png";
export default function menuInfo() {
  const navigation = useNavigation();
  async function sair() {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  async function usuarios() {
    if (navigation.getState().routes[0].name !== "Colaboradores") {
      navigation.reset({
        index: 0,
        routes: [{ name: "Colaboradores" }],
      });
    }
  }

  async function inicio() {
    if (navigation.getState().routes[0].name !== "Home") {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }

  async function cadastrar() {
    if (navigation.getState().routes[0].name !== "Cadastrar") {
      navigation.reset({
        index: 0,
        routes: [{ name: "Cadastrar" }],
      });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={inicio}>
        <Image source={homeIcon} style={{ width: 40, height: 40 }} />
        <Text style={styles.text}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={usuarios}>
        <Image source={usersIcon} style={{ width: 40, height: 40 }} />
        <Text style={styles.text}>Colaboradores</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={cadastrar}>
        <Image source={cadastroIcon} style={{ width: 40, height: 40 }} />
        <Text style={styles.text}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={sair}>
        <Image source={logoutIcon} style={{ width: 40, height: 40 }} />
        <Text style={styles.text}>Sair</Text>
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
