import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, AsyncStorage, ScrollView, TouchableOpacity } from "react-native";
import Menu from "../../components/Menu";
import background from "../../../assets/Background.png";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";

export default function Colaboradores() {
  const navigation = useNavigation();
  const [pessoas, setPessoas] = useState([]);

  async function handlePessoasApi() {
    const token = await AsyncStorage.getItem("token");
    await api
      .get("users/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPessoas(response.data);
      })
      .catch((err) => {
        console.error("erro" + err);
      });
  }

  async function infoPessoa(id) {
    AsyncStorage.setItem("id", id);
    navigation.navigate("Info");
  }

  useEffect(() => {
    handlePessoasApi();
  }, []);

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.workspace}>
        <View style={styles.fundoLista}>
          <Text style={styles.title}>Colaboradores</Text>
          <ScrollView style={styles.scrollList}>
            {pessoas.map((pessoa, key) => {
              return (
                <TouchableOpacity onPress={() => infoPessoa(pessoa.id)}>
                  <View style={styles.info}>
                    <View style={styles.infoPessoa}>
                      <Text style={{ fontSize: 17 }}>Nome: {pessoa.name}</Text>
                      <Text style={{ fontSize: 17 }}>Email: {pessoa.email}</Text>
                      <Text style={{ fontSize: 17 }}>Matrícula: {pessoa.matricula}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <Menu />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  workspace: {
    width: "100%",
    height: "96%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fundoLista: {
    width: "90%",
    height: "80%",
    backgroundColor: "rgba(111, 75, 239, 0.3)",
    alignItems: "center",
    borderRadius: 10,
    paddingBottom: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    flex: 0.05,
    margin: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  scrollList: {
    flex: 1,
    width: "100%",
    marginLeft: 10,
    height: "100%",
  },
  info: {
    flex: 1,
    flexDirection: "row",
    width: "95%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
