import React from "react-native";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Icon } from "@ui-kitten/components";

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity  style={styles.footerItem}>
        <Icon style={styles.icon} name="map-outline" fill="#000" />

        <Text>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity   style={styles.footerItem}>
        <Icon style={styles.icon} name="calendar-outline" fill="#000" />
        <Text>Events</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem}>
        <Icon style={styles.icon} name="settings-outline" fill="#000" />
        <Text>settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
const styles = StyleSheet.create({
  footerContainer: {
    width: "100%",
    height: "7%",
    bottom: -0,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerItem: {
    minWidth: "33.33%",
    borderRightWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  icon: {
    width: 25,
    height: 25,
  },
});
