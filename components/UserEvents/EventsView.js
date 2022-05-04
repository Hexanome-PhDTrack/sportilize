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

const EventsView = () => {
	const [selectedTab, setSelectedTab] = useState('organized');
	const events = [
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
	]

	return (
		<>
			<EventsHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			<EventsList events={events} />
		</>

	);
};

export default EventsView;