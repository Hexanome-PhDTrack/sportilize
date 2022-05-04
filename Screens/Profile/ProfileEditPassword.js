import React from 'react-native';
import Toast from 'react-native-simple-toast';
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { Button, Icon, Input, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet } from 'react-native';
import { editUser } from '../../api/user';

const ProfileEditPassword = ({ route, navigation }) => {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const onConfirm = () => {
        const newInfo = {
            email: route.params.LoggedInUser.email,
            newPassword: newPassword
        }
        editPassword(newUser)
            .then(response => {
                if (!response.ok) {
                    throw Error('Network response was not ok')
                }
                else {
                    if (Platform.OS === "android") {
                        Toast.show("Password successfully changed");
                    }
                    setLoggedInUser(newUser);
                    navigation.goBack();
                }
            })
            .catch(error => {
                if (Platform.OS === "android") {
                    Toast.show(error.toString());
                }
            })
    }

    const isSubmitAuthorized = () => {
        return newPassword && confirmNewPassword && oldPassword && newPassword === confirmNewPassword && oldPassword !== newPassword;
    }

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: "#FFFFFF", flexGrow: 1 }}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text>Previous password:</Text>
                    <Input
                        placeholder='Previous password'
                        value={oldPassword}
                        secureTextEntry={true}
                        onBlur={() => setOldPassword(oldPassword.trim())}
                        onChangeText={nextValue => setOldPassword(nextValue)}
                        status={!oldPassword ? 'danger' : 'basic'}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>New password:</Text>
                    <Input
                        placeholder='New password'
                        value={newPassword}
                        secureTextEntry={true}
                        onBlur={() => setNewPassword(newPassword.trim())}
                        onChangeText={nextValue => setNewPassword(nextValue)}
                        status={!newPassword ? 'danger' : 'basic'}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Confirm new password:</Text>
                    <Input
                        placeholder='Confirm new password'
                        value={confirmNewPassword}
                        secureTextEntry={true}
                        onBlur={() => setConfirmNewPassword(confirmNewPassword.trim())}
                        onChangeText={nextValue => setConfirmNewPassword(nextValue)}
                        status={!confirmNewPassword ? 'danger' : 'basic'}
                    />
                </View>
                <Button disabled={!isSubmitAuthorized} onPress={() => onConfirm()} style={[styles.btn, isSubmitAuthorized() ? styles.confirmBtn : styles.disabledBtn]}>Confirm</Button>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: "100%",
        padding: 20
    },
    btn: {
        marginTop: 10,
        width: "80%"
    },
    confirmBtn: {
        backgroundColor: "#00E096",
        borderColor: '#FFFFFF'
    },
    disabledBtn: {
        backgroundColor: '#C5CEE0'
    }
});
export default ProfileEditPassword;