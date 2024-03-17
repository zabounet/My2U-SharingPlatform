import React, { useRef } from 'react';
import { Text, StyleSheet, Pressable } from "react-native";
import color from "../../public/color.js";
import Socket from '../helpers/socketHelper';
import { useNavigation } from '@react-navigation/native';

const CardObjet = ({ categorie }) => {
  const navigation = useNavigation();
  const FilterBy = () => {
    Socket.emit("search", categorie.Nom);
    // @ts-ignore
    navigation.navigate("Recherche");
  }

  return (
    <Pressable onPress={FilterBy} style={styles.card}>
      <Text style={styles.text}>{categorie.Nom}</Text>
    </Pressable>
  );

};
const styles = StyleSheet.create({
  card: {
    backgroundColor: color.Blue.BackgroundCard, borderWidth: 2, height: 100,
    width: 350, borderRadius: 10, borderColor: color.Blue.Text,
    justifyContent: 'center', alignItems: 'center', marginBottom: 15
  },
  text: { fontSize: 30 }
});
export default CardObjet;