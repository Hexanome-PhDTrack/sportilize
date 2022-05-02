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

const EventsItem = ({ event }) => {
    return (
        <View style={styles.container}>
            <View style={styles.eventInfo}>
                <Text>{event.name}</Text>
                <Text>{event.infrastructure.name}</Text>
                <Text>{event.beginDate}</Text>
                <Text>{event.sports[0].name}</Text>
            </View>
            <View>
                <Icon style={styles.icon} name="arrow-right-outline" fill="#000" />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 0.5,
        justifyContent: 'space-between',
    },
    eventInfo: {
        flexDirection: 'column',
    },
    icon: {
        width: 80,
        height: 80,
    },
})

export default EventsItem;