import { Button, Icon, Input, Modal, Text } from '@ui-kitten/components';
import React, { useContext, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, View, StyleSheet, Platform } from 'react-native';
import DefaultUserContext from '../../DefaultUserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { Updates } from 'expo';

const Settings = ({ route, navigation }) => {
    const { DefaultUser } = route.params;
    const setDefaultUser = useContext(DefaultUserContext);
    const [defaultUserName, setDefaultUserName] = useState(DefaultUser.username);
    const [isResetDataModalShown, setIsResetDataModalShown] = useState(false);

    const onDefaultUserButtonPress = async () => {
        const newDefaultUser = {
            ...DefaultUser,
            username: defaultUserName
        }
        try {
            await AsyncStorage.setItem('DefaultUser', JSON.stringify(newDefaultUser));
            setDefaultUser(newDefaultUser);
            if (Platform.OS === "android") {
                Toast.show("Successfully changed default username");
            }
            navigation.goBack();
        } catch (e) {
            if (Platform.OS === "android") {
                Toast.show("" + e);
            }
        }
    }

    const onReset = async () => {
        try {
            await AsyncStorage.multiRemove(['LoggedInUser', 'DefaultUser']);
            setDefaultUser(null);
            setIsResetDataModalShown(false);
            navigation.goBack();
        } catch (e) {
            if (Platform.OS === "android") {
                Toast.show("" + e);
            }
        }
    }

    const isNewDefaultUsernameValid = () => {
        return defaultUserName && DefaultUser.username !== defaultUserName;
    }

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: "#ffffff", flexGrow: 1 }}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text>Change default username:</Text>
                    <Input
                        placeholder='Enter a name'
                        value={defaultUserName}
                        onBlur={() => setDefaultUserName(defaultUserName.trim())}
                        onChangeText={nextValue => setDefaultUserName(nextValue)}
                        status={!isNewDefaultUsernameValid() ? 'danger' : 'basic'}
                    />
                    <Button disabled={!isNewDefaultUsernameValid()} onPress={() => { onDefaultUserButtonPress() }} style={[styles.btn, isNewDefaultUsernameValid() ? styles.confirmBtn : styles.disabledBtn]}>Confirm</Button>
                </View>
                <View style={styles.inputContainer}>
                    <Button style={[styles.btn, styles.dangerBtn]} onPress={() => { setIsResetDataModalShown(true) }}>Reset local data</Button>
                    <Modal visible={isResetDataModalShown} onBackdropPress={() => setIsResetDataModalShown(false)} backdropStyle={styles.modalBackdrop}>
                        <View style={[styles.container, { paddingLeft: 20, paddingRight: 20 }]}>
                            <Icon name="alert-triangle-outline" fill="#CC305A" style={styles.dangerIcon} />
                            <Text category="h1">Are you sure?</Text>
                            <View style={styles.rowLayout}>
                                <Button style={[styles.modalBtn, styles.confirmBtn]} onPress={() => { onReset() }}>Yes</Button>
                                <Button style={[styles.modalBtn, styles.dangerBtn]} onPress={() => setIsResetDataModalShown(false)}>No</Button>
                            </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff"
    },
    modalBackdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    inputContainer: {
        width: "100%",
        padding: 20,
        alignItems: "center"
    },
    btn: {
        marginTop: 10,
        width: "80%"
    },
    modalBtn: {
        margin: 20
    },
    confirmBtn: {
        backgroundColor: "#00E096",
        borderColor: '#FFFFFF'
    },
    disabledBtn: {
        backgroundColor: '#C5CEE0'
    },
    dangerBtn: {
        backgroundColor: "#CC305A",
        borderColor: "#CC305A"
    },
    dangerIcon: {
        height: 128,
        width: 128,
        margin: 30
    },
    rowLayout: {
        flexDirection: 'row'
    }
});

export default Settings;