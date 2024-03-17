import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { checkSession, postUser } from "../../actions/user.action";


import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonFull from "../../components/ButtonFull";
import color from "../../../public/color.js";
import HeaderText from "../../components/HeaderText";

const Inscription = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.userReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkBox, setCheckBox] = useState(false);

  const RegisterInfos = async (datas: object) => {
    await dispatch(postUser(datas));
  }

  useEffect(() => {
    if(isFocused){
      dispatch(checkSession());
      if(users.loggedIn){
        navigation.navigate("Profil");
      }
    }
  }, [dispatch, users.loggedIn, navigation, isFocused]);

  const ToConnexion = () => {
    // Naviguer vers la page "Connexion"
    navigation.navigate("Connexion");
  };
  const ToCGU = () => {
    // Naviguer vers la page "Connexion"
    navigation.navigate("CGU");
  };

  const toggleCheckBox = () => {
    setCheckBox(!checkBox);
  };
  // State variable to track password visibility

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const formik = useFormik({
    initialValues: {
      Email: "",
      MotDePasse: "",
      ConfirmMotDePasse: "",
    },
    validationSchema: Yup.object().shape({
      Email: Yup.string()
        .required("Email requis")
        .email("Email non conforme")
        .max(100, "Email ne peut pas dépasser 200 caractéres"),
      MotDePasse: Yup.string()
        .required("Mot de passe requis")
        .max(255, "Mot de passe trop long"),
      ConfirmMotDePasse: Yup.string()
        .required("Mot de passe requis")
        .max(255, "Mot de passe trop long")
        .test("passwords-match", "MDP différents", function (value) {
          return this.parent.MotDePasse === value;
        }),
    }),
    onSubmit: async (values) => {
      const DonneeInscription = {
        Email: values.Email,
        MotDePasse: values.MotDePasse,
      };
      await RegisterInfos(DonneeInscription);
    },
  });
  
  const handleInscription = async () => {
    try {
      await formik.validateForm();
      if (!checkBox) {
        alert('"Veuillez accepter les conditions générales."');
        return;
      }

      // Si la validation réussit et que la checkbox est cochée, soumettre le formulaire
      formik.handleSubmit();
    } catch (error) {
      // Si la validation échoue, afficher les erreurs
      Alert.alert(
        "Erreur de validation",
        "Veuillez corriger les erreurs dans le formulaire."
      );
    }
  };
  if(isFocused){
    return (
      <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView 
      behavior={"position"} 
      keyboardVerticalOffset={50} >
        <HeaderText />
        <View style={styles.container}>
          <View style={styles.titreBloc}>
            <Text style={styles.titre}>INSCRIPTION</Text>
          </View>
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
              <Text style={styles.errorMessage}>{formik.errors.MotDePasse}</Text>
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

          <View style={styles.row}>
            <Text style={styles.LighTitre}>Confirmation MDP :</Text>
            {formik.touched.ConfirmMotDePasse &&
              formik.errors.ConfirmMotDePasse && (
                <Text style={styles.errorMessage}>
                  {formik.errors.ConfirmMotDePasse}
                </Text>
              )}
          </View>
          <View style={styles.inputSafe}>
            <TextInput
              placeholder="Confirmation Mot De Passe"
              onChangeText={formik.handleChange("ConfirmMotDePasse")}
              onBlur={formik.handleBlur("ConfirmMotDePasse")}
              value={formik.values.ConfirmMotDePasse}
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
            />
            <MaterialCommunityIcons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              style={styles.icon}
              onPress={toggleShowConfirmPassword}
            />
          </View>

          <View style={styles.blocCGU}>
            <TouchableOpacity
              onPress={toggleCheckBox}
              style={styles.blocCheckbox}
            >
              <View
                style={[styles.checkbox, checkBox && styles.checkedCheckbox]}
              />
            </TouchableOpacity>

            <Text style={styles.textCGU}>
              En cochant cette case vous acceptez les conditions générales.
              <Pressable style={styles.cguLink} onPress={ToCGU}>
                <Text style={styles.blueCGU}>Voir les CGU.</Text>
              </Pressable>
            </Text>
          </View>

          <ButtonFull func={handleInscription} contenu={"Inscrivez vous"} />
          <Pressable onPress={ToConnexion}>
            <Text style={styles.forgetMDP}>Déja inscrit ?</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
};
// const dpToPx = (dp) => PixelRatio.roundToNearestPixel(dp * (PixelRatio.get() / 160));
const styles = StyleSheet.create({
  height: {height:'100%'},
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  titreBloc: {
    display: "flex",
   
    alignContent: "center",
    justifyContent: "center",
  },
  titre: {
    color: color.Blue.Title,
    fontSize: 24,
    textAlign: "center",
    padding: 17,
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
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 20,
  },
  LighTitre: { fontSize: 19 },
  errorMessage: { fontSize: 15, color: "red" },
  input: {
    width: "80%",
  },
  inputMail: { width: "100%" },
  icon: {
    marginLeft: 10,
    justifyContent: "flex-end",
  },
  forgetMDP: {
    fontSize: 17,
    color: "rgba(138, 130, 130, 1)",
    textAlign: "center",
  },
  blockImg: {
    height: "60%",
    marginTop: 30,

    opacity: 0.8,
    backgroundColor: "rgb(251, 242, 54)",
    borderRadius: 10,
  },
  conteneurIMG: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    zIndex: -1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  conteneurText: {
    height: "65%",
    width: "100%",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imgText: { fontSize: 30, color: "white", fontWeight: "bold", padding: 15 },

  blocCGU: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  blueCGU: { color: "rgba(4, 201, 238, 1)" },
  textCGU: { fontSize: 16, width: "80%", marginLeft: 15 },
  blocCheckbox: { display: "flex" },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  checkedCheckbox: {
    backgroundColor: color.Green.Nav_Button, // Styling de votre checkbox cochée
  },
  cguLink: {},
});

export default Inscription;
