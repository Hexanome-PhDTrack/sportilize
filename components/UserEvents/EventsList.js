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
import { View, StyleSheet, ScrollView } from "react-native";
import EventsItem from "./EventsItem";

const DynamicEventsList = ({ events, LoggedInUser }) => {
    return (
        <ScrollView>
            {
                events.map((event) => {
                    return (
                        <EventsItem key={event.id} event={event} LoggedInUser={LoggedInUser} />
                    )
                })
            }
        </ScrollView>
    )
}

const EventsList = ({ events }) => {
    return (
        <View style={styles.list}>
            {events !== undefined ? <DynamicEventsList events={events}/> : <></>}
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
    },
})

export default EventsList;