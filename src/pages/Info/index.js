import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import background from "../../../assets/Background.png";
import Menu from "../../components/MenuInfo";
import api from "../../services/api";

export default function Info() {
  const [pessoa, setPessoa] = useState([]);

  async function getPessoa() {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    await api
      .get(`users/find/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPessoa(response.data.user);
      })
      .catch((err) => {
        console.error("erro" + err);
      });
  }

  useEffect(() => {
    getPessoa();
  }, []);
  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.workspace}>
        <View style={styles.fundoLista}>
          <Text style={styles.title}>Informações detalhadas</Text>
          <ScrollView style={styles.scrollList}>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Nome</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.name}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Matrícula</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.matricula}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Escolaridade</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.escolaridade}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Aniversário</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.aniversario}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Admissão</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.admissao}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Competência</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.competencia}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Alocação</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.alocacao}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Time</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.time}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Vínculo</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.vinculo}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.email}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Gitlab</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.gitlab}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.fundoItem}>
              <View style={styles.containerInput}>
                <Text style={styles.label}>Telefone</Text>
                <View style={styles.input}>
                  <View style={styles.textInput}>
                    <Text style={styles.infoText}>{pessoa.telefone}</Text>
                  </View>
                </View>
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
    marginLeft: 30,
    height: "100%",
  },
  fundoItem: {
    flex: 1,
    width: "95%",
    height: 70,
    justifyContent: "center",
    marginBottom: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    alignItems: "center",
    backgroundColor: "rgba(111, 75, 239, 0)",
    borderRadius: 5,
    justifyContent: "center",
  },
  containerInput: {
    flex: 1,
    width: "95%",
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    width: "95%",
  },
  textInput: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 18,
    justifyContent: "center",
  },
  infoText: {
    fontSize: 18,
    marginLeft: 5,
  },
  buttonCadastrar: {
    width: "40%",
    height: 40,
    backgroundColor: "#6f4be0",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 100,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
