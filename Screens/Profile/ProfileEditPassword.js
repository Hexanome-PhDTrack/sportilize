import React from 'react-native';
import Toast from 'react-native-simple-toast';
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { Button, Icon, Input, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet } from 'react-native';
import { editPassword, editUser } from '../../api/user';

const ProfileEditPassword = ({ route, navigation }) => {
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const onConfirm = async () => {
        const newInfo = {
            email: route.params.LoggedInUser.email,
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        editPassword(newInfo)
            .then(response => {
                if (response.status === 204) {
                    Toast.show("Password changed successfully");
                    navigation.goBack();
                }
                else{
                    throw Error("Password change has failed. Check the previous password's correctness and try again.", Toast.LONG);
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
                        status={!newPassword || oldPassword === newPassword ? 'danger' : 'basic'}
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
                        status={!confirmNewPassword || newPassword !== confirmNewPassword ? 'danger' : 'basic'}
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