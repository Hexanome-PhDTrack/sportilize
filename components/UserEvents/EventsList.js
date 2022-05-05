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
import EventsItem from "./EventsItem";

const EventsList = ({ events }) => {
    return (
        <View style={styles.list}>
            {events && events.map((event) => {
                return (
                    <EventsItem key={event.id} event={event} />
                )
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
    },
})

export default EventsList;