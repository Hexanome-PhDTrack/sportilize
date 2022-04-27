import React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, SafeAreaView, Image } from "react-native";
import { Icon, Popover, Button, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import ProfilePopover from './ProfilePopover';

const Header = () => {

    const [visible, setVisible] = React.useState(false);

    const renderProfileIcon = () => (
        <Icon
            style={styles.icon}
            name='person-outline'
            fill='#000000'
        />
    );

    const renderToggleButton = () => (
        <Button accessoryLeft={renderProfileIcon} onPress={() => setVisible(true)} />
    );

    return (
        <SafeAreaView style={styles.header} >
            <View style={styles.leftPart}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                <Text style={styles.logoText}>Sportilize</Text>
            </View>
            <ProfilePopover placement={'bottom end'}
                style={{ position: 'absolute', marginTop: 48 }}
                visible={visible}
                anchor={renderToggleButton}
                onBackdropPress={() => setVisible(false)} />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create(
    {
        header: {
            flexDirection: "row",
            padding: '2%',
            paddingLeft: '4%',
            paddingRight: '4%',
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            height: '8%',
            width: '100%',
            backgroundColor: "#C280F7",
            alignItems: 'center',
            justifyContent: "space-between",
        },
        leftPart: {
            width: '50%',
            flexDirection: 'row',
        },
        logoText: {
            fontSize: 24,
            color: "black",

        },
        icon: {
            width: 32,
            height: 32,
        },
        logo: {
            width: 32,
            height: 32,
        },
    }
)

export default Header; 