import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

import { View, Text, StyleSheet, ImageBackground, AsyncStorage, ScrollView, Dimensions } from "react-native";

import background from "../../../assets/Background.png";
import api from "../../services/api";

export default function Home() {
  const [history, setHistory] = useState([]);

  async function getHistory() {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    await api
      .get("history/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHistory(response.data);
        console.log(history);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getHistory();
  }, []);

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.workspace}>
        <Header />
        <View style={styles.fundoLista}>
          <Text style={styles.title}>Histórico</Text>
          <ScrollView style={styles.scrollList}>
            {history.map((item) => {
              return (
                <View style={styles.info}>
                  <Text>{item.User.name}</Text>
                  <Text>{item.date}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
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
});
