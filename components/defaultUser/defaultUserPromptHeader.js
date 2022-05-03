import React from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Icon, Text } from "@ui-kitten/components";

export default DefaultUserPromptHeader = () => {
    return (
        <View style={styles.modalHeader}>
            <Text category='h1'>Welcome</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
});