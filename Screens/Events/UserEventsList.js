import React, { useState, useEffect } from "react";
import { Layout, Text, Input, Icon, Button } from "@ui-kitten/components";
import {
	View,
	ScrollView,
	Image,
	KeyboardAvoidingView,
	TouchableOpacity,
} from "react-native";
import styles from "./Style.js";
import {
	IndexPath,
	Select,
	SelectItem,
	Datepicker,
} from "@ui-kitten/components";
import { CreateAnEvent } from "../../api/Event.js";
import { useNavigation } from "@react-navigation/native";
import EventsView from "../../components/UserEvents/EventsView.js";

const UserEventsList = ({ route, navigation }) => {
	const { LoggedInUser } = route.params;

	return (
		<EventsView LoggedInUser={LoggedInUser} />
	);
};

export default UserEventsList;
