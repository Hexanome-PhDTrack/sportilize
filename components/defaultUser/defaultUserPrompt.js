import React from 'react-native';
import uuid from 'react-native-uuid';
import Toast from 'react-native-simple-toast';
import defaultUserPromptHeader from './defaultUserPromptHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Input, Modal, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { addDefaultUser } from '../../api/user';

export default defaultUserPrompt = ({ isDefaultUserPromptVisible, setIsDefaultUserPromptVisible, setDefaultUser }) => {
    const [defaultUserName, setDefaultUserName] = useState("");

    const onDefaultUserButtonPress = async () => {
        const newDefaultUser = {
          uuid: uuid.v4(),
          username: defaultUserName
        }
        console.log(newDefaultUser);
        addDefaultUser(newDefaultUser)
          .then(response => {
            console.log(response)
            if (!response.ok) {
              throw Error('Network response was not ok')
            }
            else {
              try {
                AsyncStorage.setItem('DefaultUser', JSON.stringify(newDefaultUser));
                setDefaultUser(newDefaultUser);
                setIsDefaultUserPromptVisible(false);
                setDefaultUserName("");
              }
              catch (e) {
                throw Error('Saving default user information to local storage failed: ' + e)
              }
            }
          })
          .catch(error => {
            if(Platform.OS === "android") {
              Toast.show(error.toString());
            }
          })
      }

    return (
        <Modal visible={isDefaultUserPromptVisible} backdropStyle={styles.modalBackdrop}>
            <Card disabled={true} header={defaultUserPromptHeader}>
                <Text>Please enter a name to use the application:</Text>
                <Input
                    placeholder='Enter a name'
                    value={defaultUserName}
                    onChangeText={nextValue => setDefaultUserName(nextValue)}
                    status={!defaultUserName ? 'danger' : 'basic'}
                />
                <Button disabled={!defaultUserName} onPress={onDefaultUserButtonPress} style={[styles.modalButton, defaultUserName ? styles.modalConfirmButton : styles.modalDisabledbutton]}>Confirm</Button>
            </Card>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalBackdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
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