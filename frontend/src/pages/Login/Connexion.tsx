import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { checkSession, checkUserLogins } from "../../actions/user.action";
import {
  View,
  TextInput,
  Text,
  // Alert,
  StyleSheet,
  Pressable,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonFull from "../../components/ButtonFull";
import color from "../../../public/color.js";
import HeaderText from "../../components/HeaderText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NODE_URL } from "../../config.js";

const Connexion = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.userReducer);

  const sendInfos = async (datas: object) => {
    await dispatch(checkUserLogins(datas));
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(checkSession());
      if (users.loggedIn) {
        navigation.navigate("Profil");
      }
    }
  }, [dispatch, users.loggedIn, navigation, isFocused]);
  const formik = useFormik({
    initialValues: {
      Email: "",
      MotDePasse: "",
    },
    validationSchema: Yup.object().shape({
      Email: Yup.string()
        .required("Email requis")
        .email("Email non conforme")
        .max(100, "Email ne peut pas dépasser 200 caractéres"),
      MotDePasse: Yup.string()
        .required("Mot de passe requis")
        .max(255, "Mot de passe trop long"),
    }),
    onSubmit: async (values) => {
      const DonneeConnexion = {
        Email: values.Email,
        MotDePasse: values.MotDePasse,
      };
      await sendInfos(DonneeConnexion);
    },
  });
  if (isFocused) {
    return (
      <SafeAreaView style={{flex:1}}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={-450}
         
        >
          <HeaderText />
        
          <View style={styles.container}>
            <Text style={styles.titre}>CONNEXION</Text>
            
            <View style={styles.row}>
              <Text style={styles.LighTitre}>E-mail :</Text>
              {formik.touched.Email && formik.errors.Email && (
                <Text style={styles.errorMessage}>{formik.errors.Email}</Text>
              )}
            </View>

            <View style={styles.inputSafe}>
              <TextInput
                placeholder="Email"
                onChangeText={formik.handleChange("Email")}
                onBlur={formik.handleBlur("Email")}
                value={formik.values.Email}
                style={styles.inputMail}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.LighTitre}>Mot De Passe :</Text>
              {formik.touched.MotDePasse && formik.errors.MotDePasse && (
                <Text style={styles.errorMessage}>
                  {formik.errors.MotDePasse}
                </Text>
              )}
            </View>
            <View style={styles.inputSafe}>
              <TextInput
                placeholder="Mot de passe"
                onChangeText={formik.handleChange("MotDePasse")}
                onBlur={formik.handleBlur("MotDePasse")}
                value={formik.values.MotDePasse}
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View>
          
          <View style={styles.buttonMarginTop}>
            <ButtonFull func={formik.handleSubmit} contenu={"Connectez-vous"} />
            {/* ToProfil aprés vérification si email = mdp   */}
            <Pressable
              onPress={() => {
                navigation.navigate("Reinitialisation");
              }}
            >
              <Text style={styles.forgetMDP}>Mot de passe oublié ?</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.conteneurIMG}
            onPress={() => {
              navigation.navigate("Inscription");
            }}
          >
            <View style={styles.blockImg}>
              <Image
                source={{uri:NODE_URL + "/appImages/defaultCommunaute.jpg", cache:"force-cache"}}
                style={styles.backgroundImage}
                resizeMode="cover"
              />
              <View style={styles.conteneurText}>
                <Text style={styles.imgText}>Pas encore membre ?</Text>
                <Text style={styles.imgText}>Nous rejoindre !</Text>
              </View>
            </View>
          </Pressable>
          </View>
         
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
};
// const dpToPx = (dp) => PixelRatio.roundToNearestPixel(dp * (PixelRatio.get() / 160));
const styles = StyleSheet.create({
  
  container: {
    marginLeft: 10,
    marginRight: 10,
    height:1000
    
  },
  titre: {
    color: color.Blue.Title,
    fontSize: 24,
    textAlign: "center",
    padding: 17,
  },
  LighTitre: { fontSize: 19, marginTop: 10 },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
   
  },
  input: {
    width: "80%",
  },
  inputSafe: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "rgba(2, 80, 95, 1)",
    borderWidth: 1,
    backgroundColor: "rgba(227, 232, 233, 1)",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  inputMail: { width: "100%" },
  icon: {},
  forgetMDP: {
    fontSize: 17,
    color: "rgba(138, 130, 130, 1)",
    textAlign: "center",
  },
  blockImg: {
    display: "flex",

    width: "80%",
    maxHeight: 140,
    minHeight: 200,

    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,

    opacity: 0.8,
    backgroundColor: "rgb(251, 242, 54)",
    borderRadius: 30,
  },
  conteneurIMG: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  buttonMarginTop: { marginTop: 10 },
  conteneurText: {
    color: "white",
    alignItems: "center",

    flexDirection: "column",
  },
  imgText: { fontSize: 30, color: "white", fontWeight: "bold", padding: 15 },
  errorMessage: { fontSize: 15, marginTop: 10, color: "red" },
});

export default Connexion;
