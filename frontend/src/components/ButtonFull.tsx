import React from "react";
import {  Text, Pressable, StyleSheet } from "react-native";
import color from "../../public/color.js";





const ButtonFull = ({ func, contenu })  => {
    return ( 

        <Pressable style={styles.button} onPress={func}>
          <Text style={styles.textButton}>{contenu}</Text>
        </Pressable>
    ) }

    const styles = StyleSheet.create({
        button: {
            backgroundColor: color.Green.Nav_Button,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 8,
            borderRadius: 10,
            margin: 20,
          },
          textButton: { color: color.Yellow.Title, fontSize: 19 }
      });
      
      export default ButtonFull;
      