import React, { useState, useEffect } from "react";
import { Layout, Text, Input, Icon, Button } from "@ui-kitten/components";
import {
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform
} from "react-native";
import styles from "./Style.js";
import {
  IndexPath,
  Select,
  SelectItem,
  Datepicker,
} from "@ui-kitten/components";
import { CreateAnEvent, GetSports } from "../../api/Event.js";
import { useNavigation } from "@react-navigation/native";
import LoadingBlockScreen from "../../components/LoadingBlockScreen";
import Toast from 'react-native-simple-toast';

const checkProperties = (obj) => {
  let arr = [];
  for (let key in obj) {
    arr.push(obj[key] !== undefined && obj[key] !== null && obj[key] !== "");
  }
  return arr.includes(false);
};

const CreateEvent = ({ route, navigation, LoggedInUser }) => {
  const [selectedIndex, setSelectedIndex] = useState([new IndexPath(0)]);
  const [SportList, setSportsList] = useState([]);
  const [LoadingVisible, setLoadingVisibility] = useState(true);

  useEffect(async () => {
    const sports = await GetSports();
    setSportsList(sports);
    setLoadingVisibility(false)
  }, []);

  const [userInput, setUserInput] = useState({
    creator: LoggedInUser.uuid,
    name: "",
    sports: [],
    beginDate: new Date(),
    endDate: new Date(),
    participantsNumber: "",
    description: "",
    infrastructureId: route.params.id,
  });

  const HandleUserInput = (Input, Name) => {
    if (Name === "StartHour") {
      const newStartDate = userInput.beginDate;
      newStartDate.setHours(Number(Input));
      setUserInput({ ...userInput, beginDate: newStartDate });
    }
    else if (Name === "StartMinute") {
      const newStartDate = userInput.beginDate;
      newStartDate.setMinutes(Number(Input));
      setUserInput({ ...userInput, beginDate: newStartDate });
    }
    else if (Name === "EndHour") {
      const newEndDate = userInput.endDate;
      newEndDate.setHours(Number(Input));
      setUserInput({ ...userInput, endDate: newEndDate });
    }
    else if (Name === "EndMinute") {
      const newEndDate = userInput.endDate;
      newEndDate.setMinutes(Number(Input));
      setUserInput({ ...userInput, endDate: newEndDate });
    }
    else{
      setUserInput({ ...userInput, [Name]: Input });
    }
  };

  let selectedSports = [];
  selectedIndex.forEach((d) => {
    selectedSports.push(SportList[d.row]);
  });

  useEffect(() => {
    setUserInput({ ...userInput, sports: selectedSports });
  }, [selectedIndex]);

  const createEvent = async () => {
    if (!checkProperties(userInput)) {
      try {
        const response = await CreateAnEvent(userInput, LoggedInUser);
        if (response.ok) {
          if (Platform.OS === 'android') {
            Toast.show("Successfully created event");
          }
          navigation.navigate("Map");
        } else {
          alert("Something went wrong , try again");
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Please fill all inputs");
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.Container}>
          <Image
            style={styles.EventImage}
            source={require("../../assets/img.jpg")}
          />
          <Text style={styles.EventTitle}>{route.params.name}</Text>
          <View style={styles.FormContainer}>
            <View style={styles.FormItem}>
              <Text style={styles.InputLabel}>Event name:</Text>
              <Input
                style={styles.Input}
                placeholder="Event name"
                onChangeText={(text) => HandleUserInput(text, "name")}
              />
            </View>
            <View style={styles.FormItem}>
              <Text style={styles.InputLabel}>Sport:</Text>
              <Select
                value={selectedSports.join(", ")}
                multiSelect={true}
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index)}
              >
                {SportList.map((d) => (
                  <SelectItem key={d} title={d} />
                ))}
              </Select>
            </View>
            <Text style={{ width: "85%" }}>Start : </Text>

            <View style={styles.DateTimeContainer}>
              <Datepicker
                style={{ maxWidth: "100%" }}
                date={userInput.beginDate}
                onSelect={(nextDate) => HandleUserInput(nextDate, "beginDate")}
              />
              <Icon style={styles.icon} fill="#000" name="calendar-outline" />

              <Input
                style={styles.TimeInput}
                onChangeText={(text) => HandleUserInput(text, "StartHour")}
              />
              <Text> : </Text>

              <Input
                style={styles.TimeInput}
                onChangeText={(text) => HandleUserInput(text, "StartMinute")}
              />
            </View>
            <Text style={{ width: "85%" }}>End : </Text>
            <View style={styles.DateTimeContainer}>
              <Datepicker
                date={userInput.endDate}
                onSelect={(nextDate) => HandleUserInput(nextDate, "endDate")}
              />
              <Icon style={styles.icon} fill="#000" name="calendar-outline" />

              <Input
                style={styles.TimeInput}
                onChangeText={(text) => HandleUserInput(text, "EndHour")}
              />
              <Text> : </Text>
              <Input
                style={styles.TimeInput}
                onChangeText={(text) => HandleUserInput(text, "EndMinute")}
              />
            </View>
            <View style={styles.FormItem}>
              <Text style={styles.InputLabel}>Number of participants :</Text>
              <Input
                style={styles.Input}
                placeholder="Number of participants"
                onChangeText={(text) =>
                  HandleUserInput(text, "participantsNumber")
                }
              />
            </View>
            <View style={styles.FormItem}>
              <Text style={styles.InputLabel}>Description:</Text>
              <Input
                multiline={true}
                style={styles.Input}
                textStyle={{ minHeight: 64 }}
                placeholder="Description"
                onChangeText={(text) => HandleUserInput(text, "description")}
              />
            </View>
          </View>
          <Button onPress={createEvent} style={styles.Btn}>
            Confirm
          </Button>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.BackBtn}
      >
        <Icon style={styles.icon} fill="#000" name="arrow-back-outline" />
      </TouchableOpacity>
      {LoadingVisible && <LoadingBlockScreen />}

    </KeyboardAvoidingView>
  );
};

export default CreateEvent;
