import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from "react-native";
import voltarIcon from "../../../assets/return.png";
import confirmarIcon from "../../../assets/arrow.png";
import api from "../../services/api";

export default function MenuEditar({
  nome,
  matricula,
  escolaridade,
  aniversario,
  admissao,
  competencia,
  alocacao,
  time,
  vinculo,
  email,
  gitlab,
  telefone,
}) {
  const navigation = useNavigation();

  async function voltar() {
    navigation.reset({
      index: 0,
      routes: [{ name: "Info" }],
    });
  }

  const handleEditar = async (e) => {
    e.preventDefault();
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    const user = {};
    if (nome !== "") user.name = nome;
    if (matricula !== "") user.matricula = matricula;
    if (escolaridade !== "") user.escolaridade = escolaridade;
    if (aniversario !== "") user.aniversario = aniversario;
    if (admissao !== "") user.admissao = admissao;
    if (competencia !== "") user.competencia = competencia;
    if (alocacao !== "") user.alocacao = alocacao;
    if (time !== "") user.time = time;
    if (vinculo !== "") user.vinculo = vinculo;
    if (email !== "") user.email = email;
    if (gitlab !== "") user.gitlab = gitlab;
    if (telefone !== "") user.telefone = telefone;
    await api
      .put(`/users/update/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        navigation.reset({
          index: 0,
          routes: [{ name: "Colaboradores" }],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={voltar}>
        <Image source={voltarIcon} style={{ width: 30, height: 30 }} />
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={handleEditar}>
        <Image source={confirmarIcon} style={styles.confirmaImg} />
        <Text style={styles.text}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "60%",
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
  confirmaImg: {
    width: 30,
    height: 30,
    marginLeft: 5,
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
