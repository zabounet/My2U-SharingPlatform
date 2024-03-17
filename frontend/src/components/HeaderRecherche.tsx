import React, {useState} from "react";
import { View,StyleSheet, TextInput, Image, Pressable } from "react-native";
import color from "../../public/color.js";
import Logo from "./Logo";
import { useNavigation } from '@react-navigation/native';
import Socket from "../helpers/socketHelper";


const HeaderRecherche = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const ToSearch = () => {

    Socket.emit("search", search);
    // @ts-ignore
    navigation.navigate("Recherche");
    
  }

  const toHome = () => {
    // @ts-ignore
    navigation.navigate("Home");
  }

  return (
  <View style={styles.container}>
    <Pressable onPress={toHome}>
      <Logo />
    </Pressable>
     <View style={styles.textRight}>
    <View style={styles.blockInput}>
      <TextInput
      placeholder="Que recherchez-vous ?"
      style={styles.input}
      onChangeText={(text) => setSearch(text)}
      onSubmitEditing={ToSearch}
       />
       <Pressable onPress={ToSearch}>
      <Image
      source={require("../assets/img/search.png")}
      style={styles.img}
      />
      </Pressable>
    </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 20,
    backgroundColor: color.Blue.BackgroundHeader,
  },
  logoLeft: {
    flex: 1,
    padding: 15,
  },
  textRight: {
    flex: 3,
    marginLeft:15,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  input: {
    color:color.Blue.Title,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    flex: 1, // Ajustez la flexibilité de l'input
    
  },
  blockInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 10,
    margin: 10,
    width:'100%'
  },
  img: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  fontSize: { fontSize: 20 },
  colorBlue: { color: color.Blue.Title },
  colorYellow: { color: color.Yellow.Title },
});

export default HeaderRecherche;
