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

const DynamicEventsList = ({ events }) => {
    return (
        <>
            {
                events.map((event) => {
                    return (
                        <EventsItem key={event.id} event={event} />
                    )
                })
            }
        </>
    )
}

const EventsList = ({ events }) => {
    return (
        <View style={styles.list}>
            {events && <DynamicEventsList events={events}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
    },
})

export default EventsList;