import React from "react";
import { View, Text, StyleSheet } from "react-native";
import color from "../../public/color.js";
import Logo from "./Logo";

const HeaderText = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoLeft}>
        <Logo />
      </View>
      <View style={styles.textRight}>
        <Text style={styles.fontSize}>
          My <Text style={styles.colorBlue}>passions</Text>, My
          <Text style={styles.colorBlue}> skills</Text>...
        </Text>
        <Text style={styles.fontSize}>
          To <Text style={styles.colorYellow}>You</Text> !
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
   padding:20,
    backgroundColor: color.Blue.BackgroundHeader,
    
  },
  logoLeft: {
    flex: 1,
    padding:15
  },
  textRight: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  fontSize: { fontSize: 20 },
  colorBlue: { color: color.Blue.Title },
  colorYellow: { color: color.Yellow.Title },
});

export default HeaderText;
