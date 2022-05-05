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
import { View, StyleSheet } from "react-native";
import EventsHeader from "./EventsHeader";
import EventsList from "./EventsList";
import { GetCreatedEvents, GetPlannedEvents } from "../../api/Event";

const EventsView = ({ LoggedInUser }) => {
	const [selectedTab, setSelectedTab] = useState('organized');
	const [events, setEvents] = useState([]);

	useEffect(() => {
		if (selectedTab === "organized") {
			GetCreatedEvents(LoggedInUser)
				.then(response => {
					if (response) {
						setEvents(response);
					}
					else {
						setEvents([])
					}
				})
		}
		else if (selectedTab === "planned") {
			if (LoggedInUser) {
				GetPlannedEvents(LoggedInUser)
					.then(response => {
						console.log(JSON.stringify(response));
						if (response) {
							setEvents(response);
						}
						else {
							setEvents([])
						}
					})
			}
			else {
				const defaultUser = JSON.parse(AsyncStorage.getItem('DefaultUser'));
				if (defaultUser) {
					GetPlannedEvents(defaultUser)
						.then(response => {
							console.log(JSON.stringify(response));
							if (response) {
								setEvents(response);
							}
							else {
								setEvents([])
							}
						})
				}
			}
		}
	}, [selectedTab]);

	/*const events = [
		{
			id: 1,
			name: "Course simple",
			infrastructure: {
				name: "Terrain lambda"
			},
			beginDate: new Date().toLocaleDateString('fr'),
			sports: [
				{
					name: "Running",
				},
			]
		},
		{
			id: 2,
			name: "Match tennis",
			infrastructure: {
				name: "Terrain de tennis"
			},
			beginDate: new Date().toLocaleDateString('fr'),
			sports: [
				{
					name: "Tennis",
				},
			]
		}
	]*/

	return (
		<>
			<EventsHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} LoggedInUser={LoggedInUser} />
			<EventsList events={events} LoggedInUser={LoggedInUser} />
		</>

	);
};

export default EventsView;