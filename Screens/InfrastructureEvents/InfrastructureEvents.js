import { useFocusEffect } from '@react-navigation/native';
import { Text } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { View as ScrollView } from 'react-native';
import { GetInfrastructureNotClosedEvents } from '../../api/Event';
import EventsItem from '../../components/UserEvents/EventsItem';

export default InfrastructureEvents = ({ route, navigation }) => {
    const { infrastructure, LoggedInUser } = route.params;
    const [events, setEvents] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            GetInfrastructureNotClosedEvents(infrastructure)
                .then(response => {
                    setEvents(response);
                })
        }, [infrastructure])
    );

    return (
        <>
            <Text category="h1" style={{ textAlign: "center", padding: 20, backgroundColor: "#ffffff" }}>{infrastructure.name}</Text>
            <ScrollView contentContainerStyle={{ backgroundColor: "#FFFFFF", flexGrow: 1 }}>
                {
                    events.map((event) => {
                        return (<EventsItem key={event.id} event={event} LoggedInUser={LoggedInUser} />)
                    })
                }
            </ScrollView>
        </>
    )
}