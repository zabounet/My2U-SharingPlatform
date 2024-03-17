import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import color from "../../../public/color.js";
import Logo from "../../components/Logo";
import CardMembre from "../../components/CardMembre";
import CardCommunaute from "../../components/CardCommunaute";
import ButtonFull from "../../components/ButtonFull";
// import socket from "../../helpers/socketHelper";
import { isEmpty } from "../../components/Utils";
import { useSelector, useDispatch } from "react-redux";
import { checkSession, getUsers } from "../../actions/user.action";
import { getCommunautes } from "../../actions/communaute.action";

// import { getUserById } from "../../actions/user.action";

const Presentation = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const communautes = useSelector((state: any) => state.communauteReducer);
  // ! Mettre sur toutes les pages {
  const users = useSelector((state: any) => state.userReducer);

  useEffect(() => {
    if (isFocused) {
      dispatch(checkSession());
      if (users.loggedIn) {
        navigation.navigate("Profil");
      } else {
        dispatch(getCommunautes());
        dispatch(getUsers());
      }
    }
  }, [dispatch, users.loggedIn, navigation, isFocused]);

  // ! }
  const handlePress = () => {
    // socket.emit("test", "Hello from the client !");
    // Naviguer vers la page "Connexion"
    navigation.navigate("Connexion");
  };

  // ! PENSEZ A DESACTIVE LE COMPORTEMENT NATUREL DU SMARTPHONE RETOUR
  if (isFocused) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.background}>
            <ScrollView>
              <View style={styles.header}>
                <View style={styles.logo}>
                  <Logo />
                </View>
                <View style={styles.blockTitre}>
                  <Text style={styles.titre}>
                    <Text
                      style={{
                        color: color.Blue.Title,
                        fontSize: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      BIENVENUE
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "baseline" }}
                    >
                      <Text style={{ color: color.Yellow.Title, fontSize: 42 }}>
                        My
                      </Text>
                      <Text style={{ color: color.Blue.Title, fontSize: 42 }}>
                        2
                      </Text>
                      <Text style={{ color: color.Yellow.Title, fontSize: 42 }}>
                        u
                      </Text>
                      <Text style={{ color: color.Blue.Title, fontSize: 22 }}>
                        de moi à toi
                      </Text>
                    </View>
                  </Text>
                </View>
              </View>
              <View style={styles.description}>
                <Text style={styles.fontSizeDesc}>
                  Vous avez des compétences ?
                </Text>
                <Text style={styles.fontSizeDesc}>Du matériel à préter ?</Text>
                <Text style={styles.fontSizeDesc}>Besoin dun service ?</Text>
                <Text style={styles.fontSizeDesc}>
                  Rejoignez-nous pour échanger avec notre communautée !
                </Text>
              </View>
              <ButtonFull func={handlePress} contenu={"Nous rejoindre !"} />
              <View style={styles.containerCardMembre}>
                <ScrollView horizontal style={styles.scrollView}>
                  {!isEmpty(users.infos) &&
                    (users.infos as Array<any>)
                      .slice(0, 3)
                      .map((user: any, index: any) => (
                        <CardMembre user={user} key={index} />
                      ))}
                </ScrollView>
              </View>

              <ScrollView
                style={{ height: Dimensions.get('window').height / 2 }}
                contentContainerStyle={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap"
                }} >
                {!isEmpty(communautes.communautes) &&
                  (communautes.communautes as Array<any>)
                    .slice(0, 4)
                    .map((communaute: any, index: any) => (
                      <View style={{ width: "45%" }}>
                        <CardCommunaute communaute={communaute} key={index} />
                      </View>
                    ))}
              </ScrollView>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  background: { backgroundColor: color.Blue.Background },
  header: { display: "flex", flexDirection: "row" },
  logo: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginLeft: 15,
  },
  blockTitre: { flex: 3, marginTop: 17 },
  fontSizeDesc: { fontSize: 22 },
  titre: { marginTop: 10 },
  description: { marginLeft: 15, marginTop: 10 },

  containerCardMembre: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    height: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },
  scrollView: { flexDirection: "row" },
});
export default Presentation;