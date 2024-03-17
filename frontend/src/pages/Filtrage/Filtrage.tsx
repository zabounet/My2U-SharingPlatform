import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import color from "../../../public/color.js";
import HeaderRecherche from "../../components/HeaderRecherche";
import ObjetsScreen from "./ObjetsScreen";
import ServicesScreen from "./ServicesScreen";
import CommunautesScreen from "./CommunautesScreen";

const Objets = ({ navigation }) => {
  const [tabStates, setTabStates] = useState({
    Objets: true,
    Services: false,
    Communautes: false,
  });

  const setSelected = (tab) => {
    setTabStates({
      Objets: false,
      Services: false,
      Communautes: false,
      [tab]: true,
    });
  }







  return (
    // <ScrollView>
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="position" >
        <HeaderRecherche />

        <View style={styles.container}>
          <View style={[styles.message, tabStates.Objets && styles.underline]}>
            <Pressable onPress={() => setSelected("Objets")}>
              <Text style={[styles.text, tabStates.Objets && styles.bold]}>Objets</Text>
            </Pressable>
          </View>
          <View style={[styles.message, tabStates.Services && styles.underline]}>
            <Pressable onPress={() => setSelected("Services")}>
              <Text style={[styles.text, tabStates.Services && styles.bold]}>Services</Text>
            </Pressable>
          </View>
          <View style={[styles.message, tabStates.Communautes && styles.underline]}>
            <Pressable onPress={() => setSelected("Communautes")}>
              <Text style={[styles.text, tabStates.Communautes && styles.bold]}>Communautés</Text>
            </Pressable>
          </View>
        </View>

        {tabStates.Objets && <ObjetsScreen navigation={navigation} />}
        {tabStates.Services && <ServicesScreen navigation={navigation} />}
        {tabStates.Communautes && <CommunautesScreen navigation={navigation} />}


      </KeyboardAvoidingView>
    </SafeAreaView>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  height: { height: "100%" },
  mainContainer: {},
  container: {
    width: "100%",
    height: 50,
    backgroundColor: color.Green.Nav_Button,
    display: "flex",
    flexDirection: "row",
  },
  message: { flex: 1, justifyContent: "center", alignItems: "center" },

  text: { color: color.Yellow.Text, fontSize: 14, paddingBottom: 10 },
  underline: { borderBottomWidth: 3, borderBottomColor: color.Yellow.Title },
  bold: { fontWeight: 'bold' }
});

export default Objets;
