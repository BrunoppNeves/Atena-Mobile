import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
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
  Alert,
  Image,
} from "react-native";
import background from "../../../assets/Background.png";
import Menu from "../../components/Menu";
import api from "../../services/api";
export default function Cadastrar() {
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
  const navigation = useNavigation();

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

  async function handleDeleteUser(id) {
    const token = await AsyncStorage.getItem("token");
    await api.delete(`users/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async function handleAddImage(id) {
    const token = await AsyncStorage.getItem("token");
    const data = new FormData();
    images.map((image, key) => {
      data.append(`foto${key + 1}`, {
        name: image.fileName,
        uri: image.uri,
        type: "image/jpg",
      });
    });
    await api
      .post(`images/upload/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Alert.alert("Colaborador cadastrado com sucesso!");
        navigation.reset({
          index: 0,
          routes: [{ name: "Colaboradores" }],
        });
      })
      .catch((error) => {
        handleDeleteUser(id);
        Alert.alert("Erro ao cadastrar colaborador, verifique as informações e tente novamente.");
      });
  }

  async function handleAdd() {
    if (images.length !== 5) {
      Alert.alert("Por favor, selecione 5 fotos");
    } else {
      const token = await AsyncStorage.getItem("token");
      const data = {
        name: nome,
        matricula: matricula,
        escolaridade: escolaridade,
        aniversario: aniversario,
        admissao: admissao,
        competencia: competencia,
        alocacao: alocacao,
        time: time,
        vinculo: vinculo,
        email: email,
        gitlab: gitlab,
        telefone: telefone,
      };
      await api
        .post("users/create", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          handleAddImage(response.data.id);
        })
        .catch((error) => {
          Alert.alert("Erro ao cadastrar colaborador, verifique as informações e tente novamente.");
        });
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView contentContainerStyle={styles.box} behavior="position" keyboardVerticalOffset={-185} enabled>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.workspace}>
            <View style={styles.fundoLista}>
              <Text style={styles.title}>Cadastro</Text>
              <ScrollView style={styles.scrollList} scrollEnabled={true}>
                <View style={styles.fundoItem}>
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Nome</Text>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Informe o nome completo do colaborador."
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
                        placeholder="Informe a matrícula do colaborador."
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
                        placeholder="Informe a escolaridade do colaborador. Ex: Educação infantil"
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
                        placeholder="Informe o aniversário do colaborador. Ex: 01-01-2000"
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
                        placeholder="Informe a data de admissão do colaborador. Ex: 01-01-2000"
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
                        placeholder="Informe a competência do colaborador. Ex: iot, backend, ..."
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
                        placeholder="Informe a alocação do colaborador. Ex: Vortex, DTEC, ..."
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
                        placeholder="Informe o time do colaborador. Ex: Venus, Netuno, ..."
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
                        placeholder="Informe o vínculo do colaborador. Ex: Estagiario, Bolsista, ..."
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
                        placeholder="Informe o email do colaborador. Ex: user@unifor.br"
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
                        placeholder="Informe o gitlab do colaborador. Ex: user@gitlab.com"
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
                        placeholder="Informe o telefone do colaborador. Ex: (xx) 9xxxx-xxxx"
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
                  <TouchableOpacity style={styles.buttonCadastrar} onPress={handleAdd}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <Menu />
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
