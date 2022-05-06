import React from 'react-native';
import * as eva from '@eva-design/eva';
import HomeScreen from './components/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "react-native-gesture-handler";
import { useState, useEffect, createContext } from 'react';
import { ApplicationProvider, IconRegistry, ModalService } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import DefaultUserPrompt from './components/defaultUser/defaultUserPrompt';
import Auth from "./Screens/LoginSigunp";
import Dashboard from "./Screens/Dashboard";
import LoadingScreen from "./Screens/LoadingScreen";
import AppContext from './AppContext';
import DefaultUserContext from './DefaultUserContext';

ModalService.setShouldUseTopInsets = true


const App = () => {
  const [defaultUser, setDefaultUser] = useState(null);
  const [isDefaultUserPromptVisible, setIsDefaultUserPromptVisible] = useState(false);
  const [CurrentScreen, NavigateToScreen] = useState("Loading");
  const [LoggedInUser, setLoggedInUser] = useState(null);

  useEffect(async () => {
    /*try {
      await AsyncStorage.removeItem("LoggedUser")
    } catch (error) {
      
    }*/

    // check if the device's default user is already set
    const defaultUserFromStorage = JSON.parse(await AsyncStorage.getItem('DefaultUser'));
    if (!defaultUserFromStorage) {
      setIsDefaultUserPromptVisible(true);
    }
    else {
      setDefaultUser(defaultUserFromStorage)
    }

    // check if a user is already logged in
    const LoggedUser = JSON.parse(await AsyncStorage.getItem("LoggedUser"));
    if (LoggedUser) {
      setLoggedInUser(LoggedUser);
    }

    NavigateToScreen("Dashboard");
  }, []);

  useEffect(async () => {
    if (!defaultUser) {
      const defaultUserFromStorage = JSON.parse(await AsyncStorage.getItem('DefaultUser'));
      if (!defaultUserFromStorage) {
        setIsDefaultUserPromptVisible(true);
      }
    }
  }, [defaultUser])

  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppContext.Provider value={setLoggedInUser}>
          <DefaultUserContext.Provider value={setDefaultUser}>
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
                  LoggedInUser={LoggedInUser}
                  NavigateToScreen={NavigateToScreen}
                  DefaultUser={defaultUser}
                />
              )
            }
          </DefaultUserContext.Provider>
        </AppContext.Provider>
      </ApplicationProvider>
    </>
  )
}

export default App;
