import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage, Alert } from "react-native";
import voltarIcon from "../../../assets/return.png";
import editarIcon from "../../../assets/edit.png";
import deletarIcon from "../../../assets/delete.png";
import api from "../../services/api";

export default function MenuCadastrar() {
  const navigation = useNavigation();

  async function voltar() {
    await AsyncStorage.removeItem("id");
    navigation.reset({
      index: 0,
      routes: [{ name: "Colaboradores" }],
    });
  }

  async function editar() {
    navigation.reset({
      index: 0,
      routes: [{ name: "Editar" }],
    });
  }

  async function deletar() {
    const id = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");
    api
      .delete(`/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        Alert.alert("Colaborador deletado com sucesso!");
        navigation.reset({
          index: 0,
          routes: [{ name: "Colaboradores" }],
        });
      })
      .catch((err) => {
        Alert.alert("Erro ao deletar colaborador, tente novamente!");
      });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={voltar}>
        <Image source={voltarIcon} style={{ width: 30, height: 30 }} />
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={editar}>
        <Image source={editarIcon} style={styles.iconEdit} />
        <Text style={styles.text}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={deletar}>
        <Image source={deletarIcon} style={{ width: 25, height: 25 }} />
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
  },
  iconEdit: {
    width: 27,
    height: 27,
    marginLeft: 6,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 7,
    marginLeft: 5,
    marginBottom: 7,
  },
});
