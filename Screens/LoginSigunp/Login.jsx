import React, { useState, useContext } from "react";
import { Layout, Text, Input, Button, Icon } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import { LogUsers } from "../../api/user";
import styles from "./Style.js";
import AppContext from "../../AppContext";

const Login = ({ navigation }) => {
  const setLoggedInUser = useContext(AppContext);
  const [showError, setShowError] = useState(false);
  const [showSucces, setshowSucces] = useState(false);
  const [Message, setMsg] = useState("");
  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const HandleUserInput = (Input, Name) => {
    setUserInput({ ...userInput, [Name]: Input });
  };
  const LoginUser = async () => {
    if (
      userInput.email.match(validEmailRegex) &&
      userInput.password.trim() != ""
    ) {
      try {
        const response = await LogUsers(userInput);
        if (response.ok) {
          setMsg("User Found");
          setshowSucces(true);
          //storing user Data in cache
          await AsyncStorage.setItem("LoggedUser", JSON.stringify(response));

          console.log(await AsyncStorage.getItem("LoggedUser"));
          console.log(response);
          setLoggedInUser(response);
          navigation.navigate("Map");
        } else {
          setMsg(response.message);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 1500);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Please fill all inputs");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "#FFFFFF", flexGrow: 1 }}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.FormContainer}>
          <View style={styles.FormItem}>
            <Text style={styles.InputLabel}>Email adress:</Text>
            <Input
              size="large"
              style={styles.Input}
              placeholder="Enter your email"
              onBlur={() => setUserInput({ ...userInput, email: userInput.email.toLowerCase().trim() })}
              onChangeText={(text) => HandleUserInput(text, "email")}
            />
          </View>
          <View style={styles.FormItem}>
            <Text style={styles.InputLabel}>Enter your password:</Text>
            <Input
              style={styles.Input}
              value={userInput.password}
              size="large"
              placeholder="Password"
              secureTextEntry={true}
              onBlur={() => setUserInput({ ...userInput, password: userInput.password.trim() })}
              onChangeText={(text) => HandleUserInput(text, "password")}
            />
          </View>

          {showError && (
            <View style={styles.ErrorMsg}>
              <Text style={{ color: "#fff", textAlign: "center" }}>{Message}</Text>
            </View>
          )}
          {showSucces && (
            <View style={{ ...styles.ErrorMsg, backgroundColor: "#35C935" }}>
              <Text style={{ color: "#fff", textAlign: "center" }}>{Message}</Text>
            </View>
          )}

          <Button onPress={LoginUser} style={styles.LoginBtn}>
            Login
          </Button>
        </View>
      </KeyboardAvoidingView >
    </ScrollView >
  );
};

export default Login;
