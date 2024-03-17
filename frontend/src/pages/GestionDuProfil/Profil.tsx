import React, { useEffect, useState } from "react";
import { isEmpty } from "../../components/Utils";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import color from "../../../public/color.js";
import HeaderRecherche from "../../components/HeaderRecherche";
import ProfilScreen from "./ProfilScreen";
import ParametresScreen from "./ParametresScreen";
import CatalogueScreen from "./CatalogueScreen";
import SuivisScreen from "./SuivisScreen";
import { useSelector, useDispatch } from "react-redux"; 
import { checkSession, getUserById} from "../../actions/user.action";
import { getSeveralCommunauteById } from "../../actions/communaute.action";


const Profil = ({navigation}) => {
  const isFocused = useIsFocused();

  const [tabStates, setTabStates] = useState({
    Profil: true,
    Parametres: false,
    Catalogue: false,
    Suivis: false,
  });

  const setSelected = (tab) => {
    setTabStates({
      Profil: false,
      Parametres: false,
      Catalogue: false,
      Suivis: false,
      [tab]: true,
    });
  };

  const user = useSelector((state: any) => state.userReducer);
  const communautes = useSelector((state: any) => state.communauteReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isFocused){
      dispatch(checkSession());
      if(user.loggedIn === false){
        navigation.navigate("Connexion");
        }
    }
  }, [dispatch, navigation, user.loggedIn, isFocused]);

  useEffect(() => {
    if(isFocused){
      dispatch(getUserById());
    }
  }, [dispatch, isFocused])

  useEffect(() => {
    if(isFocused){
      dispatch(getSeveralCommunauteById(user.userId.communautésSuivies));
    }
  }, [dispatch, isFocused])
  
  if(isFocused){
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <HeaderRecherche />
          <View style={styles.container}>
            <View style={[styles.profil, tabStates.Profil && styles.underline]}>
              <Pressable onPress={() => setSelected("Profil")}>
                <Text style={[styles.text, tabStates.Profil && styles.bold]}>Profil</Text>
              </Pressable>
            </View>
            <View
              style={[
                styles.parametres,
                tabStates.Parametres && styles.underline,
              ]}
            >
              <Pressable onPress={() => setSelected("Parametres")}>
                <Text style={[styles.text, tabStates.Parametres && styles.bold]}>Paramètres</Text>
              </Pressable>
            </View>
            <View
              style={[styles.catalogue, tabStates.Catalogue && styles.underline]}
            >
              <Pressable onPress={() => setSelected("Catalogue")}>
                <Text style={[styles.text, tabStates.Catalogue && styles.bold]}>Catalogue</Text>
              </Pressable>
            </View>
            <View style={[styles.suivis, tabStates.Suivis && styles.underline]}>
              <Pressable onPress={() => setSelected("Suivis")}>
                <Text style={[styles.text, tabStates.Suivis && styles.bold]}>Suivis</Text>
              </Pressable>
            </View>
          </View>
              
          {!isEmpty(user.userId) ?
                (tabStates.Profil && <ProfilScreen user={user.userId} communaute={communautes.communautes} navigation={navigation} />)||
                (tabStates.Parametres && <ParametresScreen />)||
                (tabStates.Catalogue && <CatalogueScreen />)||
                (tabStates.Suivis && <SuivisScreen /> )
              : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  height: { height: "100%" },
  scrollView: {
    backgroundColor: "pink",
  },
  container: {
    width: "100%",
    height: 50,
    backgroundColor: color.Green.Nav_Button,
    display: "flex",
    flexDirection: "row",
  },
  profil: { flex: 1, justifyContent: "center", alignItems: "center" },
  parametres: { flex: 1, justifyContent: "center", alignItems: "center" },
  catalogue: { flex: 1, justifyContent: "center", alignItems: "center" },
  suivis: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: color.Yellow.Text, fontSize: 14, paddingBottom: 10 },
  underline: { borderBottomWidth: 3, borderBottomColor: color.Yellow.Title },
  blockImg: {
    width: "100%",
    height: 300,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  img: { width: 200, height: 150, borderRadius: 25 },
  imgMid: { flex: 2, alignItems: "center" },
  imgText: { fontSize: 25 },
  imgLeft: { flex: 1, alignItems: "center" },
  imgRight: { flex: 1, alignItems: "center" },
  information: { display: "flex", flexDirection: "row", width: "100%" },
  informationBlock: { flex: 1 },
  informationText: { fontSize: 20, textAlign: "center" },
  interet: {
    backgroundColor: color.Blue.BackgroundCard,
    width: "90%",
    height: "30%",
    alignSelf: "center",
  },
  bold:{fontWeight:'bold'}
});

export default Profil;
