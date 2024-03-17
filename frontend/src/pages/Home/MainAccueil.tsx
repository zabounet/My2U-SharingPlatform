import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  Pressable,
} from "react-native";
import color from "../../../public/color.js";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../actions/user.action";
import HeaderRecherche from "../../components/HeaderRecherche";
import CardMembre from "../../components/CardMembre";
import { isEmpty } from "../../components/Utils";
import { useEffect } from "react";
import { NODE_URL } from "../../config.js";
import { useIsFocused } from "@react-navigation/native";

const MainAccueil = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.userReducer);

  useEffect(() => {
    if (isFocused)
      dispatch(getUsers());
  }, [dispatch, isFocused])

  if (isFocused && !isEmpty(users.infos) && (users.infos as Array<any>).length !== undefined) {
    return (

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <KeyboardAvoidingView behavior="position">

            <HeaderRecherche />

            {/* <Pressable onPress={() => {navigation.navigate('Presentation')}}> */}

            <View style={styles.blockText}>
              <Text style={styles.label}>Ils sont proches de vous</Text>
            </View>

            {/* </Pressable>  */}
            <View style={styles.listCard}>
              {!isEmpty(users.infos) && (users.infos as Array<any>).map((user: any, index: any) => {
                if(user._id !== users.userId._id)
                return <CardMembre user={user} key={index} />
              })}

            </View>
            <View style={styles.blockText}>
              <Text style={styles.label}>
                Besoin d'une communauté pour partager vos passions ?
              </Text>
            </View>

            <Pressable
              style={styles.conteneurIMG}
              onPress={() => {
                navigation.navigate("Profil");
              }}
            >
              <View style={styles.blockImg}>
                <Image
                  source={{ uri: NODE_URL + "/appImages/defaultCommunaute.jpg" }} // <-- Pour les images utilisateurs/communauté, il faudra utiliser NODE_URL + "/appImages/" + nomImage
                  style={styles.backgroundImage}
                  resizeMode="cover"
                />

                <Text style={styles.imgText}>
                  Laissez nous vous mettre en lien.
                </Text>

              </View>
            </Pressable>

            <View style={styles.blockText}>
              <Pressable onPress={() => { navigation.navigate('CGU') }}>
                <Text style={styles.label2}>Mentions légales</Text>
              </Pressable>
            </View>

          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>

    );
  }
};

const styles = StyleSheet.create({
  label: { fontSize: 20, textAlign: "center" },
  label2: { fontSize: 16, textAlign: "center" },
  blockText: { justifyContent: "center", alignItems: "center", height: 100 },

  listCard: {
    alignItems: 'center',
    marginLeft: 10
  },

  blockImg: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",

    width: "80%",
    maxHeight: 140,
    minHeight: 200,

    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    backgroundColor: "rgb(251, 242, 54)",
    borderRadius: 15,
    overflow: "hidden",

  },
  conteneurIMG: {
    position: "relative",
    height: 300
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: 200,
    opacity: 0.8,

  },


  imgText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",

    textAlign: "center",
  },
});

export default MainAccueil;