import React from 'react-native';
import Toast from 'react-native-simple-toast';
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { Button, Icon, Input, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet } from 'react-native';
import { editUser } from '../../api/user';

const ProfileEditInfo = ({ route, navigation }) => {
    const { LoggedInUser } = route.params;
    const setLoggedInUser = useContext(AppContext);
    const [username, setUsername] = useState(LoggedInUser.username);

    const onConfirm = () => {
        const newUser = {
            ...LoggedInUser,
            username: username
        }
        editUser(newUser)
            .then(response => {
                if (!response.ok) {
                    throw Error('Network response was not ok')
                }
                else {
                    if(Platform.OS === "android") {
                        Toast.show("Username successfully changed");
                    }
                    setLoggedInUser(newUser);
                    navigation.goBack();
                }
            })
            .catch(error => {
                if(Platform.OS === "android") {
                    Toast.show(error.toString());
                }
            })
    }

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: "#FFFFFF", flexGrow: 1 }}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text>Username:</Text>
                    <Input
                        placeholder='Username'
                        value={username}
                        onBlur={() => setUsername(username.trim())}
                        onChangeText={nextValue => setUsername(nextValue)}
                        status={!username ? 'danger' : 'basic'}
                    />
                </View>
                <Button disabled={!username} onPress={() => onConfirm()} style={[styles.btn, username ? styles.confirmBtn : styles.disabledBtn]}>Confirm</Button>
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
export default ProfileEditInfo;