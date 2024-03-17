import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  Dimensions
} from "react-native";
import color from "../../../public/color.js";
import CardObjet from '../../components/CardObjet';
import Slider from '../../components/Slider';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { getCategorieByType } from "../../actions/categorie.action";
import { isEmpty } from "../../components/Utils";

const ObjetsScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const categorie = useSelector((state: any) => state.categorieReducer);


  useEffect(() => {
    dispatch(getCategorieByType('Materiel'));
  }, [dispatch]);

  return (
    <View>
      <ScrollView
        style={{ height: Dimensions.get('window').height / 1.6, paddingTop: 20 }}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap"
        }} >

        {!isEmpty(categorie.categories) && (categorie.categories as Array<any>).map((categorie: any, index: any) => (
          <CardObjet categorie={categorie} key={index} />
        ))}

      </ScrollView>
      <Slider />
    </View>

  );
};

export default ObjetsScreen;