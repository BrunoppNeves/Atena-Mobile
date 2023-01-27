import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import background from "../../../assets/Background.png";
import Menu from "../../components/MenuEditar";
import api from "../../services/api";
export default function Editar() {
  const [pessoa, setPessoa] = useState([]);
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [escolaridade, setEscolaridade] = useState("");
  const [aniversario, setAniversario] = useState("");
  const [admissao, setAdmissao] = useState("");
  const [competencia, setCompetencia] = useState("");
  const [alocacao, setAlocacao] = useState("");
  const [time, setTime] = useState("");
  const [vinculo, setVinculo] = useState("");
  const [email, setEmail] = useState("");
  const [gitlab, setGitlab] = useState("");
  const [telefone, setTelefone] = useState("");
  const [images, setImages] = useState([]);

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
  async function handleImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled === false && result.assets.length >= 5) {
      setImages(result.assets);
    } else {
      Alert.alert("Selecione 5 imagens");
      setImages([]);
    }
  }

  useEffect(() => {
    getPessoa();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView contentContainerStyle={styles.box} behavior="position" keyboardVerticalOffset={-185} enabled>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.workspace}>
            <View style={styles.fundoLista}>
              <Text style={styles.title}>Editar</Text>
              <ScrollView style={styles.scrollList}>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Nome</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.name}`}
                        placeholderTextColor="#999"
                        autoCapitalize="sentences"
                        paddingLeft={5}
                        autoCorrect={false}
                        value={nome}
                        onChangeText={(value) => setNome(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Matrícula</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.matricula}`}
                        placeholderTextColor="#999"
                        autoCapitalize="sentences"
                        keyboardType="number-pad"
                        paddingLeft={5}
                        autoCorrect={false}
                        value={matricula}
                        onChangeText={(value) => setMatricula(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Escolaridade</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.escolaridade}`}
                        placeholderTextColor="#999"
                        autoCapitalize="sentences"
                        paddingLeft={5}
                        autoCorrect={false}
                        value={escolaridade}
                        onChangeText={(value) => setEscolaridade(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Aniversário (mês-dia-ano)</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.aniversario}`}
                        placeholderTextColor="#999"
                        autoCapitalize="sentences"
                        keyboardType="numbers-and-punctuation"
                        paddingLeft={5}
                        autoCorrect={false}
                        value={aniversario}
                        onChangeText={(value) => setAniversario(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Admissão (mês-dia-ano)</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.admissao}`}
                        placeholderTextColor="#999"
                        autoCapitalize="sentences"
                        keyboardType="numbers-and-punctuation"
                        paddingLeft={5}
                        autoCorrect={false}
                        value={admissao}
                        onChangeText={(value) => setAdmissao(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Competência</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.competencia}`}
                        placeholderTextColor="#999"
                        autoCapitalize="sentences"
                        paddingLeft={5}
                        autoCorrect={false}
                        value={competencia}
                        onChangeText={(value) => setCompetencia(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Alocação</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.alocacao}`}
                        placeholderTextColor="#999"
                        autoCapitalize="sentences"
                        paddingLeft={5}
                        autoCorrect={false}
                        value={alocacao}
                        onChangeText={(value) => setAlocacao(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Time</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.time}`}
                        placeholderTextColor="#999"
                        paddingLeft={5}
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        value={time}
                        onChangeText={(value) => setTime(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Vínculo</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.vinculo}`}
                        placeholderTextColor="#999"
                        paddingLeft={5}
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        value={vinculo}
                        onChangeText={(value) => setVinculo(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.email}`}
                        placeholderTextColor="#999"
                        paddingLeft={5}
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Gitlab</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.gitlab}`}
                        placeholderTextColor="#999"
                        paddingLeft={5}
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        value={gitlab}
                        onChangeText={(value) => setGitlab(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Telefone</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder={`${pessoa.telefone}`}
                        placeholderTextColor="#999"
                        paddingLeft={5}
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        value={telefone}
                        onChangeText={(value) => setTelefone(value)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fotos}>
                  {images.map((image, index) => (
                    <Image key={index} source={{ uri: image.uri }} style={{ width: 70, height: 70 }} />
                  ))}
                </View>
                <View style={styles.botoes}>
                  <TouchableOpacity style={styles.buttonCadastrar} onPress={handleImage}>
                    <Text style={styles.buttonText}>{images.length > 0 ? "Remover imagens" : "Adicionar imagens"}</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <Menu
              nome={nome}
              matricula={matricula}
              escolaridade={escolaridade}
              aniversario={aniversario}
              admissao={admissao}
              competencia={competencia}
              alocacao={alocacao}
              time={time}
              vinculo={vinculo}
              email={email}
              gitlab={gitlab}
              telefone={telefone}
              fotos={images}
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  fotos: {
    width: 350,
    flexDirection: "row",
  },
  botoes: {
    width: "87%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginTop: 10,
  },
});
