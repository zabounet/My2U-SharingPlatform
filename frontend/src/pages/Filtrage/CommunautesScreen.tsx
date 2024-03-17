import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import color from "../../../public/color.js";
import React, { useEffect } from "react";
import ButtonFull from "../../components/ButtonFull";
import CardCommunaute from "../../components/CardCommunaute";
import { isEmpty } from "../../components/Utils";
import { useSelector, useDispatch } from "react-redux";
import { getCommunautes } from "../../actions/communaute.action";
import Slider from "../../components/Slider";

const CommunautesScreen = ({ navigation }) => {
  const toProfil = () => {
    navigation.navigate('Profil');
  };
  const dispatch = useDispatch();
  const communautes = useSelector((state: any) => state.communauteReducer);

  useEffect(() => {
    dispatch(getCommunautes());
  }, [dispatch]);

  return (
    <View>
      <ButtonFull func={toProfil} contenu={'Mes Communautés'} />

      <View style={styles.line}></View>

      <ScrollView
        style={{ height: Dimensions.get('window').height / 2 }}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap"
        }} >
        {!isEmpty(communautes.communautes) && (communautes.communautes as Array<any>).map((communaute: any, index: any) => (
          <View style={{ width: "45%" }}>
            <CardCommunaute communaute={communaute} key={index} />
          </View>
        ))}
      </ScrollView>
      <Slider />

    </View>
  );
};

const styles = StyleSheet.create({
  line: { height: 2, width: '90%', backgroundColor: 'black', marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 },
});

export default CommunautesScreen;
