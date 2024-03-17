import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import color from "../../public/color.js";
import {NODE_URL} from "../config.js";

const HeaderConvPrivee = ({name, picture, navigation}) => {

    const goBack = () => {
        navigation.goBack();
    }

    const pp = NODE_URL + "/appImages/" + picture;
  return (
    <View style={styles.container}>
      <Pressable onPress={() => goBack()}>
        <Image
            source={require("../assets/Icon/Arrow.png")}
            style={styles.arrowBack}
        />
      </Pressable>
      <View style={styles.textMiddle}>
        <Text style={[{color : color.Green.Nav_Button}, styles.fontSize]}>{name}</Text>
      </View>
      <View>
        <Pressable style={{flex: 1, display: "flex", flexDirection: "column", justifyContent:"center"}}>
            <Image
                source={{uri: pp}}
                style={{ width: 70, height: 70, borderRadius: 50 }}
            />
        </Pressable>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    padding: 20,
    height: 100,
    backgroundColor: color.Blue.BackgroundHeader,
    
  },
  arrowBack: { 
    width: 35, 
    height: 20, 
    transform: [{ rotate: "180deg" }]
    },
  textMiddle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  fontSize: { fontSize: 25 },
  colorBlue: { color: color.Blue.Title },
  colorYellow: { color: color.Yellow.Title },
});

export default HeaderConvPrivee;
