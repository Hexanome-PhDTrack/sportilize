import React, { useContext } from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { Icon, Popover, Button, Layout } from "@ui-kitten/components";
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePopover = (props) => {
  const setLoggedInUser = useContext(AppContext);

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem("LoggedUser");
      setLoggedInUser(null);
      if (Platform.OS === "android"){
        Toast.show("Successfully disconnected from account.");
      }
      props.navigation.navigate("Map");
    } catch (e) {
      if (Platform.OS === "android"){
        Toast.show("Error: " + e);
      }
    }
  };

  return (
    <Popover {...props}>
      <Layout style={styles.content}>
        <Text style={styles.username}>{props.LoggedInUser.username}</Text>
        <Text style={styles.email}>{props.LoggedInUser.email}</Text>
        <Button style={styles.button}>
          View profile
        </Button>
        <Button onPress={Logout} style={styles.button}>
          Disconnect
        </Button>
      </Layout>
    </Popover>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginRight: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    marginLeft: 6,
  },
  email: {
    fontSize: 12,
    fontWeight: "200",
    marginBottom: 6,
    marginLeft: 6,
  },
  button: {
    width: "100%",
    margin: 6,
  },
});

export default ProfilePopover;
