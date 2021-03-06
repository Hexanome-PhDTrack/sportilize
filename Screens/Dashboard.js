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
import ProfileView from "./Profile/ProfileView";
import ProfileEditInfo from "./Profile/ProfileEditInfo";
import ProfileEditPassword from "./Profile/ProfileEditPassword";
import UserEventsList from "./Events/UserEventsList";
import EventDetailsScreen from "./Events/EventDetailsScreen";
import InfrastructureEvents from "./InfrastructureEvents/InfrastructureEvents";
import Settings from './Settings/Settings';

const Stack = createStackNavigator();
const Dashboard = ({ NavigateToScreen, LoggedInUser, DefaultUser }) => {
  // put all screens here as Stack.Screen
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Header NavigateToScreen={NavigateToScreen} LoggedInUser={LoggedInUser} />
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Map">
          <Stack.Screen name="Map">
            {(props) => <Map {...props} LoggedInUser={LoggedInUser}/>}
          </Stack.Screen>
          <Stack.Screen name="LoginSignup" component={LoginSignup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="ProfileView" component={ProfileView} />
          <Stack.Screen name="ProfileEditInfo" component={ProfileEditInfo} />
          <Stack.Screen name="ProfileEditPassword" component={ProfileEditPassword} />
          <Stack.Screen name="UserEventsList" component={UserEventsList} initialParams={LoggedInUser} />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
          <Stack.Screen name="InfrastructureEvents" component={InfrastructureEvents} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="CreateEvent">
            {(props) => <CreateEvent {...props} LoggedInUser={LoggedInUser} />}
          </Stack.Screen>
        </Stack.Navigator>
        <Footer LoggedInUser={LoggedInUser} DefaultUser={DefaultUser}/>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Dashboard;
