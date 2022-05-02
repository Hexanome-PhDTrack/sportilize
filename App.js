import React from 'react-native';
import * as eva from '@eva-design/eva';
import HomeScreen from './components/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "react-native-gesture-handler";
import { useState, useEffect } from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import DefaultUserPrompt from './components/defaultUser/defaultUserPrompt';
import Auth from "./Screens/LoginSigunp";
import Dashboard from "./Screens/Dashboard";
import LoadingScreen from "./Screens/LoadingScreen";

const App = () => {
  const [defaultUser, setDefaultUser] = useState({ uuid: "", username: "" });
  const [isDefaultUserPromptVisible, setIsDefaultUserPromptVisible] = useState(false);
  const [CurrentScreen, NavigateToScreen] = useState("Loading");
  const [LoggedInUser, setLoggedInUser] = useState("");

  useEffect(async () => {
    // check if the device's default user is already set
    const defaultUserFromStorage = JSON.parse(await AsyncStorage.getItem('DefaultUser'));
    if (!defaultUserFromStorage) {
      setIsDefaultUserPromptVisible(true);
    }
    else {
      setDefaultUser(defaultUserFromStorage)
    }

    // check if a user is already logged in
    const LoggedUser = await AsyncStorage.getItem("LoggedUser");
    if (LoggedUser) {
      setLoggedInUser(LoggedUser);
    }

    NavigateToScreen("Dashboard");
  }, []);

  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <DefaultUserPrompt isDefaultUserPromptVisible={isDefaultUserPromptVisible} setIsDefaultUserPromptVisible={setIsDefaultUserPromptVisible} setDefaultUser={setDefaultUser} />
        <IconRegistry icons={EvaIconsPack} />
        {CurrentScreen == "Loading" && <LoadingScreen />}
        {
          CurrentScreen == "Authentication" && (
            <Auth NavigateToScreen={NavigateAfterLogin} />
          )
        }
        {
          CurrentScreen == "Dashboard" && (
            <Dashboard
              LoggedInUser={JSON.parse(LoggedInUser)}
              NavigateToScreen={NavigateToScreen}
            />
          )
        }
      </ApplicationProvider>
    </>
  )
}

export default App;
