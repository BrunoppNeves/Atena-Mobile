import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
} from "react-native";

const background = require("../../../assets/BackgroundLogin.png");
const logo = require("../../../assets/Logo.png");
import api from "../../services/api";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    await api
      .post("auth/login", { email: email, password: password })
      .then((response) => {
        AsyncStorage.setItem("token", response.data.token);
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      })
      .catch((error) => {});
  }

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    });
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView contentContainerStyle={styles.box} behavior="position" keyboardVerticalOffset={-150} enabled>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.workspace}>
            <Image source={logo} style={styles.logo} />
            <Text style={{ fontSize: "30px", color: "white", marginTop: "10%" }}>Login</Text>
            <View style={styles.container}>
              <TextInput placeholder={"Digite o email"} style={styles.input} onChangeText={(value) => setEmail(value)} />
              <TextInput
                placeholder={"Digite a senha"}
                style={styles.input}
                keyboardType="number-pad"
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  workspace: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "50%",
    backgroundColor: "rgba(111, 75, 239, 0.4)",
    borderRadius: "10%",
    marginTop: "20%",
  },
  logo: {
    height: "20%",
    width: "30%",
    margin: "5%",
  },
  container: {
    width: "85%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
  },
  input: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: "10%",
    borderColor: "white",
    marginTop: "5%",
    padding: "5%",
    fontSize: "20px",
  },

  button: {
    width: "40%",
    height: "10%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5%",
    marginTop: "10%",
  },
});
