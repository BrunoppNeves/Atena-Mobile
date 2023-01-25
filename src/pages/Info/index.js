import React from "react";

import { View, Text, StyleSheet, ImageBackground, AsyncStorage, ScrollView, TouchableOpacity, Image } from "react-native";

import background from "../../../assets/Background.png";
import menuInfo from "../../components/menuInfo";

export default function Info({
  title,
  onClick,
  nome,
  matricula,
  time,
  vinculo,
  alocacao,
  email,
  gitlab,
  aniversario,
  telefone,
  escolaridade,
  curso,
  competencia,
  admissao,
  status,
  historicos,
  fotos,
  id,
}) {
  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.workspace}>
        <Text style={styles.title}>Perfil do colaborador</Text>
        <View style={styles.fundoLista}></View>
        <menuInfo />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  workspace: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
    marginTop: 30,
  },
  fundoLista: {
    width: "90%",
    height: "80%",
    backgroundColor: "rgba(111, 75, 239, 0.3)",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
});
