import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../../public/color.js";
import HeaderRecherche from "../../components/HeaderRecherche";
import { useSelector } from "react-redux";
import { isEmpty } from "../../components/Utils";
import ObjetsServiceScreen from "./ObjetsServicesScreen";
import CommunautesScreen from "./CommunautesScreen";
import UtilisateursScreen from "./UtilisateursScreen";
import Socket from "../../helpers/socketHelper";
import { useIsFocused } from "@react-navigation/native";

const Recherche = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [searchResult, setSearchResult] = useState("");
  const users = useSelector((state: any) => state.communauteReducer);
  const communautes = useSelector((state: any) => state.communauteReducer);

  const [tabStates, setTabStates] = useState({
    ObjetsServices: true,
    Utilisateurs: false,
    Communautes: false,
  });

  const setSelected = (tab) => {
    setTabStates({
      ObjetsServices: false,
      Utilisateurs: false,
      Communautes: false,
      [tab]: true,
    });
  }

  useEffect(() => {
    Socket.on('searchResult', (query: string) => {
      setSearchResult(query)
    })
  })

  if (isFocused) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior="position" >
          <HeaderRecherche />

          <View style={styles.container}>
            <View style={[styles.message, tabStates.ObjetsServices && styles.underline]}>
              <Pressable onPress={() => setSelected("ObjetsServices")}>
                <Text style={[styles.text, tabStates.ObjetsServices && styles.bold]}>Objets/Services</Text>
              </Pressable>
            </View>
            <View style={[styles.message, tabStates.Utilisateurs && styles.underline]}>
              <Pressable onPress={() => setSelected("Utilisateurs")}>
                <Text style={[styles.text, tabStates.Utilisateurs && styles.bold]}>Utilisateurs</Text>
              </Pressable>
            </View>
            <View style={[styles.message, tabStates.Communautes && styles.underline]}>
              <Pressable onPress={() => setSelected("Communautes")}>
                <Text style={[styles.text, tabStates.Communautes && styles.bold]}>Communautés</Text>
              </Pressable>
            </View>
          </View>

          {!isEmpty(searchResult) ?
            (tabStates.ObjetsServices && <ObjetsServiceScreen navigation={navigation} query={searchResult} />) ||
            (tabStates.Utilisateurs && <UtilisateursScreen navigation={navigation} query={searchResult} />) ||
            (tabStates.Communautes && <CommunautesScreen navigation={navigation} query={searchResult} />)
            : null}


        </KeyboardAvoidingView>
      </SafeAreaView>
      // </ScrollView>
    );
  }
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

export default Recherche;
