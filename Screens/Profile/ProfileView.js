import React from 'react-native';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Button, Icon, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet } from 'react-native';

const ProfileView = ({ route, navigation }) => {
    const { LoggedInUser } = route.params;

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: "#FFFFFF", flexGrow: 1 }}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.subContainer}>
                    <Icon name={'people'} fill={"#000000"} style={styles.icon} />
                    <Text category='h1'>{LoggedInUser.username}</Text>
                    <Text category='h6'>{LoggedInUser.email}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Button style={styles.button} onPress={() => navigation.navigate("ProfileEditInfo", { LoggedInUser: LoggedInUser })}>Edit account information</Button>
                    <Button style={styles.button}>Change password</Button>
                    <Button style={styles.button} disabled={true}>Change avatar</Button>
                    <Button style={[styles.button, styles.disconnectButton]}>Disconnect</Button>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 64,
        height: 64,
        margin: 10
    },
    button: {
        height: 60,
        margin: 10,
        width: 300
    },
    disconnectButton: {
        backgroundColor: '#ff3d71',
        borderColor: '#ff3d71'
    }
})

export default ProfileView;