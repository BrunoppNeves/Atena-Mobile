import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { View, Text, StyleSheet, ImageBackground, AsyncStorage, ScrollView, TouchableOpacity, Image, Alert } from "react-native";

import background from "../../../assets/Background.png";
import cadeadoAberto from "../../../assets/CadeadoAberto.png";
import cadeadoFechado from "../../../assets/CadeadoFechado.png";
import cadeadoTempo from "../../../assets/CadeadoTempo.png";
import api from "../../services/api";

export default function Home({ navigation }) {
  const [history, setHistory] = useState([]);

  async function getHistory() {
    const token = await AsyncStorage.getItem("token");
    await api
      .get("history/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function abre() {
    const token = await AsyncStorage.getItem("token");
    await api
      .get(`mqtt/abre`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        Alert.alert("Porta aberta!");
      })
      .catch((error) => {
        Alert.alert("Erro ao abrir a porta!");
      });
  }

  async function abre3s() {
    const token = await AsyncStorage.getItem("token");
    await api
      .get(`mqtt/abre3s`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        Alert.alert("Porta aberta!");
        setTimeout(() => {
          Alert.alert("Porta fechada!");
        }, 3000);
      })
      .catch((error) => {
        Alert.alert("Erro ao abrir a porta!");
      });
  }

  async function fecha() {
    const token = await AsyncStorage.getItem("token");
    await api
      .get(`mqtt/fecha`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        Alert.alert("Porta fechada!");
      })
      .catch((error) => {
        Alert.alert("Erro ao fechar a porta!");
      });
  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.workspace}>
        <View style={styles.fundoLista}>
          <Text style={styles.title}>Histórico</Text>
          <ScrollView style={styles.scrollList}>
            {history.map((item) => {
              return (
                <View style={styles.info}>
                  <Text style={styles.textNome}>{item.User.name}</Text>
                  <Text style={styles.textData}>{item.date}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.divButtons}>
          <TouchableOpacity style={styles.botao} onPress={abre}>
            <Text style={styles.text}>Abrir</Text>
            <Image source={cadeadoAberto}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={abre3s}>
            <Text style={styles.text}>Abrir 3s</Text>
            <Image source={cadeadoTempo}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={fecha}>
            <Text style={styles.text}>Fechar</Text>
            <Image source={cadeadoFechado}></Image>
          </TouchableOpacity>
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
    height: "70%",
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
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  divButtons: {
    width: "90%",
    height: "10%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  botao: {
    width: "30%",
    height: "80%",
    backgroundColor: "#9747FF",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  textNome: {
    fontSize: 17,
  },
  textData: {
    fontSize: 17,
    marginLeft: 10,
  },
});
