import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import color from "../../../public/color.js";
import React, { useEffect } from "react";
import ButtonFull from "../../components/ButtonFull";
import CardCommunaute from "../../components/CardCommunaute";
import { isEmpty } from "../../components/Utils";
import { useSelector, useDispatch } from "react-redux";
import { searchCommunautes } from "../../actions/communaute.action";
import Slider from "../../components/Slider";
import Socket from "../../helpers/socketHelper";
import { useIsFocused } from "@react-navigation/native";

const CommunautesScreen = ({ navigation, query }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const communautes = useSelector((state: any) => state.communauteReducer);

  useEffect(() => {
    if (isFocused)
      dispatch(searchCommunautes(query));
  }, [dispatch, isFocused, query]);

  return (
    <ScrollView>
      {isEmpty(communautes.communautes) || communautes.communautes.length >= 1 ?
        (
          <View style={styles.flexCenter}>
            <Text>{communautes.communautes?.length ?? 0} résultat(s) pour "{query}"</Text>
          </View>
        )
        :
        (
          <View style={styles.flexCenter}>
            <Text>Aucun résultat pour "{query}"</Text>
          </View>
        )
      }

      <ScrollView
        style={{ height: Dimensions.get('window').height / 2 }}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap"
        }} >
        {!isEmpty(communautes.communautes) && communautes.communautes.map !== undefined && communautes.communautes.map((communaute: any, index: number) => {
          return (
            <View style={{ width: "45%" }}>
              <CardCommunaute key={index} communaute={communaute} />
            </View>
          )
        })}
        {/* <Slider  /> */}
      </ScrollView>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  line: { height: 2, width: '90%', backgroundColor: 'black', marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 },
  flexCenter: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10
  },
});


export default CommunautesScreen;