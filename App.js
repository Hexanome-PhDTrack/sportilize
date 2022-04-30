import React from "react-native";
import * as eva from "@eva-design/eva";
import { useState, useEffect } from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import "react-native-gesture-handler";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Map from "./Screens/Map/Map";
const App = () => {
  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <Map />
      </ApplicationProvider>
    </>
  );
};

export default App;
