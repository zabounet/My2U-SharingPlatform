import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import color from "../../../public/color.js";
import React, { useEffect } from "react";
import ButtonFull from "../../components/ButtonFull";
import { isEmpty } from "../../components/Utils";
import { useSelector, useDispatch } from "react-redux";
import { searchUtilisateursByServices } from "../../actions/user.action";
import Slider from "../../components/Slider";
import Socket from "../../helpers/socketHelper";
import { useIsFocused } from "@react-navigation/native";
import CardMembre from "../../components/CardMembre";


const ObjetsServicesScreen = ({ navigation, query }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.userReducer);

  useEffect(() => {
    if (isFocused)
      dispatch(searchUtilisateursByServices(query));
  }, [dispatch, isFocused, query]);

  return (
    <ScrollView>
      {isEmpty(users.infos) || users.infos.length >= 1 ?
        (
          <View style={styles.flexCenter}>
            <Text>{users.infos?.length ?? 0} résultat(s) pour "{query}"</Text>
          </View>
        )
        :
        (
          <View style={styles.flexCenter}>
            <Text>Aucun résultat pour "{query}"</Text>
          </View>
        )
      }
      <View style={styles.flexCenter}>
        {!isEmpty(users.infos) && users.infos.map !== undefined && users.infos.map((user: any, index: number) => {
            return <CardMembre key={index} user={user} />
        })}
        {/* <Slider  /> */}
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flexCenter: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10
  },
});

export default ObjetsServicesScreen;
