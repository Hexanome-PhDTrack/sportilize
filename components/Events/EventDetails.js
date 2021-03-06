import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import Toast from 'react-native-simple-toast';
import { Text, Icon, Datepicker, Input, Button } from "@ui-kitten/components";
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { ParticipateInEvent, WithdrawFromEvent } from "../../api/Event";
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventDetails = ({ event, LoggedInUser }) => {
	event = { ...event, beginDate: new Date(event.beginDate), endDate: new Date(event.endDate) };
	const eventConfig = {
		title: event.name,
		startDate: event.beginDate,
		endDate: event.endDate,
	}

	const addToCalendar = () => {
		AddCalendarEvent.presentEventCreatingDialog(eventConfig)
			.then((eventInfo) => {
				console.warn(JSON.stringify(eventInfo));
			})
			.catch((error) => {
				// handle error such as when user rejected permissions
				console.warn(error);
			});
	}

	const renderCalendarIcon = () => (
		<Icon style={styles.icon} name="calendar-outline" fill="#000000" />
	);

	const onParticipate = () => {
		if (LoggedInUser) {
			ParticipateInEvent(event, LoggedInUser)
				.then(response => {
					if (response) {
						if(response.status && response.status !== 200){
							throw Error("Failure while trying to register participation")
						}
						else if (Platform.OS === 'android') {
							Toast.show("Your participation was registered");
						}
					}
					else {
						throw Error("Failure while trying to register participation")
					}
				})
				.catch(error => {
					if (Platform.OS === 'android') {
						Toast.show("" + error);
					}
				});
		}
		else {
			const defaultUser = AsyncStorage.getItem("DefaultUser");
			if (defaultUser) {
				ParticipateInEvent(event, defaultUser)
					.then(response => {
						if (response) {
							if(response.status && response.status !== 200){
								throw Error("Failure while trying to register participation")
							}
							else if (Platform.OS === 'android') {
								Toast.show("Your participation was registered");
							}
						}
						else {
							throw Error("Failure while trying to register participation")
						}
					})
					.catch(error => {
						if (Platform.OS === 'android') {
							Toast.show("" + error);
						}
					});
			}
		}
	}

	const onCancel = () => {
		if (LoggedInUser) {
			WithdrawFromEvent(event, LoggedInUser)
				.then(response => {
					console.log(response.status);
					if (response.status === 200) {
						if (Platform.OS === 'android') {
							Toast.show("Your participation was registered");
						}
					}
					else {
						throw Error("Failure while trying to register participation")
					}
				})
				.catch(error => {
					if (Platform.OS === 'android') {
						Toast.show("" + error);
					}
				});;
		}
		else {
			const defaultUser = AsyncStorage.getItem("DefaultUser");
			if (defaultUser) {
				WithdrawFromEvent(event, defaultUser)
					.then(response => {
						console.log(response.status);
						if (response.status === 200) {
							if (Platform.OS === 'android') {
								Toast.show("Your participation was registered");
							}
						}
						else {
							throw Error("Failure while trying to register participation")
						}
					})
					.catch(error => {
						if (Platform.OS === 'android') {
							Toast.show("" + error);
						}
					});;
			}
		}
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.eventDetailsContainer}>
					<Icon style={styles.iconLogo} name="smiling-face-outline" fill="#000" />

					<View>
						<Text category="h3" style={{ textAlign: "center" }}>{event.name}</Text>
						<Text style={styles.eventDescription}>{event.description}</Text>
					</View>
					<View style={styles.eventTime}>
						<Text category="h4"> Date and Time </Text>
						<View style={styles.DateTimeContainer}>
							<Text>Start : </Text>
							<Datepicker
								style={{ maxWidth: "100%" }}
								date={event.beginDate}
								disabled={true}
							/>
							<Icon style={styles.icon} fill="#000" name="calendar-outline" />

							<Input
								style={styles.TimeInput}
								placeholder={event.beginDate.getHours().toString()}
								disabled={true}
							/>
							<Text> : </Text>

							<Input
								style={styles.TimeInput}
								placeholder={event.beginDate.getMinutes().toString()}
								disabled={true}
							/>
						</View>
						<View style={styles.DateTimeContainer}>
							<Text>End :   </Text>
							<Datepicker
								style={{ maxWidth: "100%" }}
								date={event.endDate}
								disabled={true}
							/>
							<Icon style={styles.icon} fill="#000" name="calendar-outline" />

							<Input
								style={styles.TimeInput}
								placeholder={event.endDate.getHours().toString()}
								disabled={true}
							/>
							<Text> : </Text>
							<Input
								style={styles.TimeInput}
								placeholder={event.endDate.getMinutes().toString()}
								disabled={true}
							/>
						</View>
						<Button accessoryLeft={renderCalendarIcon} onPress={() => addToCalendar()}>Add to calendar</Button>
					</View>
					<View style={styles.eventAttendees}>
						<Text category="h4"> Attendees </Text>
						<Text>{event.numberParticipants} </Text>
						<View style={styles.attendeesButtons}>
							<Button style={{ width: '45%', margin: 10, backgroundColor: "green" }} onPress={onParticipate}>Participate</Button>
							<Button style={{ width: '45%', margin: 10, backgroundColor: "red" }} onPress={onCancel}>Cancel</Button>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default EventDetails;
const styles = StyleSheet.create({
	eventDetailsContainer: {
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
	iconItem: {
		width: 50,
		height: 50,
	},
	icon: {
		height: 30,
		width: 30,
	},
	iconLogo: {
		height: 90,
		width: 90,
		margin: 10
	},
	eventTime: {
		flexDirection: "column",
		backgroundColor: "lightblue",
		width: "90%",
		margin: 20,
		padding: 15,
		borderRadius: 10,
	},
	DateTimeContainer: {
		width: "85%",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
		marginBottom: 5,
		justifyContent: "center",
	},
	eventAttendees: {
		flexDirection: "column",
		backgroundColor: "lightblue",
		width: "90%",
		margin: 20,
		padding: 15,
		borderRadius: 10,
	},
	attendeesButtons: {
		flexDirection: 'row',
		width: '100%',
	},
	eventDescription: {
		fontSize: 15,
		marginTop: 5,
		textAlign: "center",
	},
});