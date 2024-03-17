import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import color from "../../public/color.js";

const CardService = ({categorie}) => {
 
        return (
          <View style={styles.card}>
          <Text style={styles.text}>{ categorie.Nom }</Text>
        </View>
           
         );
     };
     
     const styles = StyleSheet.create({
         card: {backgroundColor: color.Blue.BackgroundCard, borderWidth:2, height:100,
            width:350, borderRadius: 10, borderColor: color.Blue.Text, 
            justifyContent:'center', alignItems:'center', marginBottom:15},
            text:{fontSize:30}
       });


export default CardService;