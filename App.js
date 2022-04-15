import React from 'react-native';
import * as eva from '@eva-design/eva';
import HomeScreen from './components/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { ApplicationProvider, Card, Modal, Text, Input, Icon, IconRegistry, Button, useTheme } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const DefaultNamePrompt = (props) => {
  return (
    <View style={styles.modalHeader}>
      <Text category='h1'>Welcome</Text>
      <Icon name='close-outline' fill='#000000' style={styles.closeIcon} />
    </View>
  )
}

const App = () => {
  const [isNamePromptVisible, setIsNamePromptVisible] = useState(false);
  const [isLocationPromptVisible, setIsLocationPromptVisible] = useState(false);
  const [defaultName, setDefaultName] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const handleLocalStorage = async () => {
      try {
        await AsyncStorage.clear();

        setDeviceId(await AsyncStorage.getItem('@device_id'));
        setDefaultName(await AsyncStorage.getItem('@default_name'));

        if (deviceId == null) {
          const newDeviceId = uuid.v4();
          setDeviceId(newDeviceId);
        }
        if (defaultName == null) {
          setIsNamePromptVisible(true);
          setDefaultName("");
        }
      } catch (e) {
        // TODO: Implement error handler
      }
    }

    handleLocalStorage();
  }, [])

  const onDefaultNameButtonPress = async () => {
    try {
      await AsyncStorage.setItem('@device_id', deviceId);
      await AsyncStorage.setItem('@default_name', defaultName);
    }
    catch (e) {
      // TODO: Implement error handler
    }

    // TODO: Send username and gui to API
    setIsNamePromptVisible(false);
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Modal visible={isNamePromptVisible} onBackdropPress={() => setIsNamePromptVisible(false)} backdropStyle={styles.backdrop}>
          <Card disabled={true} header={DefaultNamePrompt}>
            <Text>Please enter a name to use the application:</Text>
            <Input
              placeholder='Enter a name'
              value={defaultName}
              onChangeText={nextValue => setDefaultName(nextValue)}
              status={!defaultName ? 'danger' : 'basic'}
            />
            <Button disabled={!defaultName} onPress={onDefaultNameButtonPress} style={[styles.modalButton, defaultName ? styles.modalConfirmButton : styles.modalDisabledbutton]}>Confirm</Button>
          </Card>
        </Modal>
        <HomeScreen />
      </ApplicationProvider>
    </>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalHeader: {
    paddingTop: 10,
    paddingBottom: 10
  },
  closeIcon: {
    height: 32,
    width: 32,
    margin: 10
  },
  modalHeader: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalButton: {
    marginTop: 10
  },
  modalConfirmButton: {
    backgroundColor: "#00E096",
    borderColor: '#FFFFFF'
  },
  modalDisabledbutton: {
    backgroundColor: '#C5CEE0'
  }
})

export default App;