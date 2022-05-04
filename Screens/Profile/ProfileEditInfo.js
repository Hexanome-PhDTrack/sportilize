import React from 'react-native';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { Button, Icon, Input, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet } from 'react-native';

const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ProfileEditInfo = ({ route, navigation }) => {
    const { LoggedInUser } = route.params;
    const setLoggedInUser = useContext(AppContext);
    const [username, setUsername] = useState(LoggedInUser.username);
    const [email, setEmail] = useState(LoggedInUser.email);

    const onConfirm = () => {
        const newUser = {
            ...LoggedInUser,
            username: username
        }
    }

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: "#FFFFFF", flexGrow: 1 }}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text>Username:</Text>
                    <Input
                        placeholder='Username:'
                        value={username}
                        onChangeText={nextValue => setUsername(nextValue)}
                        status={!username ? 'danger' : 'basic'}
                    />
                </View>
                <Button disabled={!username} onPress={onConfirm()} style={[styles.btn, username ? styles.confirmBtn : styles.disabledBtn]}>Confirm</Button>
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
        marginTop: 10
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