import React from 'react-native';
import * as eva from '@eva-design/eva';
import HomeScreen from './components/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import DefaultUserPrompt from './components/defaultUser/defaultUserPrompt';

const App = () => {
  const [defaultUser, setDefaultUser] = useState({ uuid: "", username: "" });
  const [isDefaultUserPromptVisible, setIsDefaultUserPromptVisible] = useState(false);

  useEffect(async () => {
    const defaultUserFromStorage = JSON.parse(await AsyncStorage.getItem('DefaultUser'));
    if (!defaultUserFromStorage) {
      setIsDefaultUserPromptVisible(true);
    }
    else {
      setDefaultUser(defaultUserFromStorage)
    }
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <DefaultUserPrompt isDefaultUserPromptVisible={isDefaultUserPromptVisible} setIsDefaultUserPromptVisible={setIsDefaultUserPromptVisible} setDefaultUser={setDefaultUser}/>
        <HomeScreen />
      </ApplicationProvider>
    </>
  )
}

export default App;