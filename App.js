import React from "react-native";
import * as eva from "@eva-design/eva";
import { useState, useEffect } from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import "react-native-gesture-handler";
import Auth from "./LoginSigunp";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
const App = () => {
  const [CurrentPage, setCurrentPage] = useState("Login");
  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <Auth />
      </ApplicationProvider>
    </>
  );
};

export default App;
