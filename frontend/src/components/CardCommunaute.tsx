import React from "react";
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from "react-native";
import FlipCard from 'react-native-flip-card'
import color from "../../public/color.js";
import { NODE_URL } from "../config.js";
import { isEmpty } from "./Utils";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addMembreCommunaute, getSeveralCommunauteById } from "../actions/communaute.action";
import { addCommunity } from "../actions/user.action";

const CardCommunaute = ({ communaute }) => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.userReducer);
  const navigation = useNavigation();

  const joinCommunaute = () => {
    if(users.loggedIn){
      if(!users.userId.communautésSuivies.includes(communaute._id)){
        dispatch(addMembreCommunaute(communaute._id, users.userId._id))
        dispatch(addCommunity(users.userId._id, communaute._id))
        // dispatch(getSeveralCommunauteById(users.userId.communautésSuivies));

        // @ts-ignore
        navigation.navigate("Profil")
      } else {
        // @ts-ignore
        navigation.navigate("Profil")
      }
    }
    else{
      // @ts-ignore
      navigation.navigate("Connexion")
    }
  }

  // ! Only for DEV
  const photo = NODE_URL + "/appImages/" + communaute.Photo
  const picto = NODE_URL + "/appImages/" + communaute.Categorie.Pictogramme
  return (
    <FlipCard
      friction={20}
      perspective={1000}
      flipHorizontal={true}
      flipVertical={true}
      flip={false}
      clickable={true}
    >
      <View style={styles.cardCommunaute}>
        <Image
          source={{ uri: photo, cache: "force-cache" }}
          style={styles.backgroundImage}
        />
        <View style={styles.contentContainer}>
          <View style={styles.TopLeftContainer}>
            <Text style={styles.nbMembre}> {(communaute.Membres as Array<Object>).length} </Text>
          </View>
          <View style={styles.bottomLeftContainer}>
            <Text style={styles.categorieImg}>
              <Image
                source={{ uri: picto }}
                style={styles.pictoImg}
              />
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}> {communaute.Nom} </Text>
        </View>
      </View>
      <View style={[styles.cardCommunaute, { padding: 5 }]}>
        <Text style={{ color: color.Blue.Title }}>
          <Text style={{ textDecorationLine: "underline", color: "black" }}>
            Catégorie
          </Text> : {communaute.Categorie.Nom}
        </Text>
        <Text style={{ fontSize: 10, paddingVertical: 10 }}>{communaute.Description}</Text>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <Pressable onPress={joinCommunaute} style={styles.joinButton}>
            <Text style={{ color: color.Yellow.Text }}>Rejoindre</Text>
          </Pressable>
        </View>
      </View>
    </FlipCard>
  );
};

const styles = StyleSheet.create({
  cardCommunaute: {
    backgroundColor: color.Blue.Background,
    width: 180,
    height: 180,

    borderColor: color.Blue.Title,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "column",
    marginBottom: 5,

    // ? Peut-être faire un fichier de style pour les ombres
    shadowColor: color.Blue.Title,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: .5,
    shadowRadius: 7,
  },

  backgroundImage: {

    resizeMode: "cover", // ou 'contain' selon vos préférences
    position: "absolute",
    width: "100%",

    height: "100%",

    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  TopLeftContainer: {
    alignItems: "flex-start"
  },
  bottomLeftContainer: {
    alignItems: "flex-start",
    marginBottom: 10,
    marginLeft: 5,
  },
  nbMembre: {
    backgroundColor: color.Yellow.Text,

    shadowColor: "#0A0A0A",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: .3,
    shadowRadius: 5,
    width: 20,
    height: 20,
    borderRadius: 50,
    margin: 10,
    textAlign: "center",
  },
  categorieImg: {
    alignItems: "flex-end",
    backgroundColor: "white",
    borderRadius: 50,
    width: 30,
    height: 30,
    shadowColor: "#0A0A0A",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: .3,
    shadowRadius: 5,
  },
  pictoImg: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  joinButton: {
    backgroundColor: color.Green.Nav_Button,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  footer: {
    backgroundColor: color.Blue.BackgroundHeader,
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  footerText: { color: color.Blue.Title },
});

export default CardCommunaute;
