import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import Colaboradores from "./src/pages/Colaboradores";
import Cadastrar from "./src/pages/Cadastro";
import Info from "./src/pages/Info";
import Editar from "./src/pages/Editar";
import { LogBox } from "react-native";
const Stack = createNativeStackNavigator();

function App() {
  LogBox.ignoreLogs(["Asyncstorage: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Colaboradores" component={Colaboradores} />
        <Stack.Screen options={{ headerShown: false }} name="Cadastrar" component={Cadastrar} />
        <Stack.Screen options={{ headerShown: false }} name="Info" component={Info} />
        <Stack.Screen options={{ headerShown: false }} name="Editar" component={Editar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
