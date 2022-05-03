import React from "react-native";
import Map from "./Map/Map";
import CreateEvent from "./Events/EventCreation";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { SafeAreaView } from "react-native";
import LoginSignup from "./LoginSigunp/LoginSignup";
import Login from "./LoginSigunp/Login";
import SignUp from "./LoginSigunp/Signup";

const Stack = createStackNavigator();
const Dashboard = ({ NavigateToScreen, LoggedInUser }) => {
  // put all screens here as Stack.Screen
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Header NavigateToScreen={NavigateToScreen} LoggedInUser={LoggedInUser}/>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Map">
          <Stack.Screen name="CreateEvent" component={CreateEvent} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="LoginSignup" component={LoginSignup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp}/>
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Dashboard;
