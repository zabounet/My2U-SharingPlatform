import React from "react";
import { View, Pressable, Text, Image, StyleSheet } from "react-native";
import color from "../../public/color.js";
import { NODE_URL } from "../config.js";
import { isEmpty } from "./Utils";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserByGivenId } from "../actions/user.action";
import { getSeveralCommunauteById } from "../actions/communaute.action";

const CardMembre = ({ user }) => {

  const users = useSelector((state: any) => state.userReducer);
  const communautes = useSelector((state: any) => state.communauteReducer);
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const toUserProfile = async () => {
    if (users.loggedIn) {

      await dispatch(getUserByGivenId({"id":user._id}))
      await dispatch(getSeveralCommunauteById(user.communautésSuivies))
      // @ts-ignore
      navigation.navigate("VisitProfilUtilisateur");
    } else {
      // @ts-ignore
      navigation.navigate("Connexion");
    }
  }

  let pic = NODE_URL + "/appImages/" + user.Photo;

  return (
    <Pressable onPress={toUserProfile} style={styles.card}>
      <View>
        <Text style={styles.title}>{user.NomPrenom}</Text>
      </View>
      <View style={styles.infosContainer}>
        <View style={styles.blockLeft}>
          <Text style={[styles.underline, styles.padding]}>Matériel proposé:</Text>
          {!isEmpty(user.Materiels) && user.Materiels.slice(0, 4).map((materiel: any, key: any) => {
            if (materiel.Disponible) {
              return <Text style={{ paddingLeft: 5 }} key={key}>{key === 3 ? materiel.Nom + "..." : materiel.Nom + ","}</Text>
            }
          })}

          <Text style={[styles.underline, styles.padding]}>Services proposés:</Text>
          {!isEmpty(user.Services) && user.Services.slice(0, 4).map((service: any, key: any) => {
            return <Text style={{ paddingLeft: 5 }} key={key}>{service.Nom}</Text>
          })}

          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={[styles.underline, styles.padding]}>Ville:</Text>
            <Text style={styles.padding}>{user.Ville}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={[styles.underline, styles.padding]}>Karma:</Text>
            <Text style={styles.padding}>{user.Karma}</Text>
          </View>
        </View>
        <View style={styles.blockRight}>
          <Image
            source={{ uri: pic, cache: "force-cache" }}
            style={styles.img}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: color.Blue.BackgroundCard,
    width: 360,
    borderColor: color.Blue.Title,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10

  },

  infosContainer: {
    display: "flex",
    flexDirection: "row",
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: 'center'
  },
  blockLeft: { flex: 3 },
  blockRight: { flex: 1, justifyContent: "center", alignItems: "center" },
  underline: { textDecorationLine: "underline", fontWeight: 'bold' },
  padding: { padding: 5 },
  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20 // <-- Oh la vilaine bidouille
  },
});

export default CardMembre;
