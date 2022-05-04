import React, { useState, useEffect } from "react";
import {
    Layout,
    Text,
    Input,
    Button,
    Modal,
    Card,
    Icon,
    Select,
    IndexPath,
    SelectItem,
    Datepicker,
} from "@ui-kitten/components";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const EventsHeader = ({ selectedTab, setSelectedTab, LoggedInUser }) => {
    const navigation = useNavigation();

    const onTabChanged = (newTab) => {
        setSelectedTab(newTab);
    }

    if (!LoggedInUser) { selectedTab = 'planned' }

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.button} onPress={() => LoggedInUser ? onTabChanged('organized') : navigation.navigate('LoginSignup')}>
                <Text style={selectedTab === 'organized' ? styles.selectedTabText : null}>Events organized by you</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onTabChanged('planned')}>
                <Text style={selectedTab === 'planned' ? styles.selectedTabText : null}>Planned events</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: '7%',
        flexDirection: 'row',
    },
    button: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#000",
    },
    selectedTabText: {
        color: '#2750df',
        fontWeight: 'bold'
    }
})

export default EventsHeader;