import React from "react";

import { View, Text, StyleSheet, ImageBackground, AsyncStorage, ScrollView, TouchableOpacity, Image } from "react-native";

import background from "../../../assets/Background.png";
import Menu from "../../components/MenuInfo";

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
        <View style={styles.fundoLista}>
          <ScrollView>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={{ fontSize: 15, color: "white", fontWeight: "bold", marginRight: 10 }}>Nome:</Text>
                <Text style={{ fontSize: 15, color: "white" }}>{nome}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <Menu />
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
    justifyContent: "flex-start",
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
    alignItems: "flex-start",
    borderRadius: 5,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 5,
  },
});
