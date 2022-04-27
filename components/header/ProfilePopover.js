import React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, SafeAreaView, Image } from "react-native";
import { Icon, Popover, Button, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const ProfilePopover = (props) => {
    return (
        <Popover
            {...props}>
            <Layout style={styles.content}>
                <Text style={styles.username}>
                    Andrew Huggings
                </Text>
                <Text style={styles.email}>
                    andrew.huggings@wanadoo.fr
                </Text>
                <Button style={styles.button} onPress={() => {console.log("bouton")}}>
                    View profile
                </Button>
                <Button style={styles.button}>
                    Disconnect
                </Button>
            </Layout>
        </Popover>
    )
}

const styles = StyleSheet.create(
    {
        content: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingHorizontal: 8,
            paddingVertical: 12,
            marginRight: 15,
        },
        username: {
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 6,
            marginLeft: 6,
        },
        email: {
            fontSize: 12,
            fontWeight: "200",
            marginBottom: 6,
            marginLeft: 6,
        },
        button: {
            width: '100%',
            margin: 6,
        }
    }
)

export default ProfilePopover; 